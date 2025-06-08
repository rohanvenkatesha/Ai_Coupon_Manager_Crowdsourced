from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)
    store = Column(String, index=True)
    code = Column(String, unique=True, index=True)
    discount = Column(Float)
    expires_at = Column(Date)
