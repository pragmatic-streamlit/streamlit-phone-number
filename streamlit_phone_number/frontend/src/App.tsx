import React from "react";
import { withStreamlitConnection, StreamlitComponentBase, ComponentProps, Streamlit } from 'streamlit-component-lib';
import PhoneInput, { Country, parsePhoneNumber } from 'dp-react-phone-number-input';
import 'dp-react-phone-number-input/style.css';

export enum StreamlitEventType {
  PHONE_NUMBER_CHANGE = "PHONE_NUMBER_CHANGE",
}

export interface StreamlitEvent {
  type: StreamlitEventType;
  number: string;
  country?: Country;
  countryCallingCode?: string;
  nationalNumber?: string;
}

export const noticeStreamlit = (event: StreamlitEvent) =>
  Streamlit.setComponentValue(event)

interface IProps {
  default_country?: Country; 
}

interface IState {
  value: string;
  country: Country;
}

class PhoneNumber extends StreamlitComponentBase<IState> {
  private args: IProps;

  constructor(props: ComponentProps) {
    super(props);
    this.args = props.args;
    this.state = {
      value: "",
      country: this.args.default_country || "CN",
    }
  }
  
  handleChange = (value: string) => {
    this.setState({ value })
  }

  handleCountryChange = (country: Country) => {
    this.setState({ country })
  }

  handleOnBlue = () => {
    const parseNumber = parsePhoneNumber(this.state.value, this.state.country)
    noticeStreamlit({
      type: StreamlitEventType.PHONE_NUMBER_CHANGE,
      number: this.state.value,
      country: parseNumber?.country,
      countryCallingCode: parseNumber?.countryCallingCode,
      nationalNumber: parseNumber?.nationalNumber,
    })
  }

  public render(): React.ReactNode {
    return (
      <PhoneInput
        placeholder="Enter phone number"
        value={this.state.value}
        onChange={this.handleChange}
        onCountryChange={this.handleCountryChange}
	      defaultCountry={this.state.country}
        onBlur={this.handleOnBlue}
      />
    )
  }
}

export default withStreamlitConnection(PhoneNumber);
