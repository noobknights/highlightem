import os
from setuptools import setup

requirement_list = [r.strip() for r in open("requirements.txt", "r").readlines() if r]


setup(python_requires=">=3")
