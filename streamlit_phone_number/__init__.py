
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
    build_dir = os.path.join(parent_dir, "frontend/dist")
    _component_func = components.declare_component("streamlit-phone-number", path=build_dir) # noqa


def st_phone_number(label, placeholder="Enter phone number", default_country: str = "CN", key = None): # noqa
    return _component_func(label=label, placeholder=placeholder, key=key, default_country=default_country) # noqa


if _DEVELOP_MODE:
    import streamlit as st

    event = st_phone_number("Phone", placeholder="ss", default_country="CN")
    st.text_input('Password here', type='password')

    st.write(event)