
import os
from typing import List, Optional
import streamlit.components.v1 as components

_DEVELOP_MODE = os.getenv('DEVELOP_MODE')
# _DEVELOP_MODE = True

if _DEVELOP_MODE:
    _component_func = components.declare_component(
        "streamlit-phone-number",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit-phone-number", path=build_dir) # noqa


def st_phone_number(key = None, default_country: str = "CN"): # noqa
    return _component_func(key=key, default_country=default_country) # noqa


if _DEVELOP_MODE:
    import streamlit as st
    event = st_phone_number("test")
    st.write(event)
    
    event = st_phone_number("test2", default_country="US")
    st.write(event)
