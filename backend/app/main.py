from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import List

import models, schemas, database, openai_client

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

@app.post("/submit-coupon")
def submit_coupon(
    coupon: schemas.CouponCreate,
    generate_code: bool = Query(False),
    db: Session = Depends(database.get_db)
):
    if generate_code or not coupon.code:
        coupon.code = openai_client.generate_coupon_code(coupon.store, coupon.discount)

    db_coupon = db.query(models.Coupon).filter(models.Coupon.code == coupon.code).first()
    if db_coupon:
        raise HTTPException(status_code=400, detail="Coupon code already exists")

    new_coupon = models.Coupon(
        store=coupon.store,
        code=coupon.code,
        discount=coupon.discount,
        expires_at=coupon.expires_at,
    )
    db.add(new_coupon)
    db.commit()
    db.refresh(new_coupon)

    return {"message": "Coupon added successfully", "coupon": new_coupon.code}

@app.get("/validate-coupon-ai")
def validate_coupon_ai(
    query: str = Query(..., description="Coupon code or description"),
    db: Session = Depends(database.get_db)
):
    coupons = db.query(models.Coupon).all()
    coupon_codes = [c.code for c in coupons]

    USE_AI_VALIDATION = False  # Set True to enable AI matching later

    if USE_AI_VALIDATION:
        # Commented out to avoid OpenAI usage until fixed
        # match = openai_client.ai_match_coupon(query, coupon_codes)
        raise HTTPException(status_code=503, detail="AI validation not available right now")
    else:
        # Simple case-insensitive exact match fallback
        match = next((code for code in coupon_codes if code.lower() == query.lower()), None)

    if match is None or match not in coupon_codes:
        return {"valid": False, "message": "No matching coupon found"}

    matched_coupon = db.query(models.Coupon).filter(models.Coupon.code == match).first()
    if matched_coupon.expires_at < date.today():
        return {"valid": False, "message": "Coupon expired"}

    return {
        "valid": True,
        "code": matched_coupon.code,
        "store": matched_coupon.store,
        "discount": matched_coupon.discount,
        "expires_at": matched_coupon.expires_at,
    }

@app.get("/validate-by-store")
def validate_by_store(
    store: str = Query(..., description="Store name to fetch coupons"),
    db: Session = Depends(database.get_db)
):
    coupons = db.query(models.Coupon).filter(models.Coupon.store.ilike(f"%{store}%")).all()
    if not coupons:
        return {"valid": False, "message": f"No coupons found for store '{store}'"}

    # Format coupons list
    coupons_list = [
        {
            "code": c.code,
            "discount": c.discount,
            "expires_at": c.expires_at,
            "expired": c.expires_at < date.today(),
        }
        for c in coupons
    ]

    return {
        "valid": True,
        "store": store,
        "coupons": coupons_list,
    }