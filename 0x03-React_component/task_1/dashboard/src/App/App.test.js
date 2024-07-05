import React from 'react';
import App from './App';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { shallow, mount } from 'enzyme';

describe('<App />', () => {
  it('App renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });
  
  it('App contains Header component', () => {
    const wrapper = shallow(<App />);
    const component = wrapper.find(Header);
    expect(component.exists()).toBe(true);
  });
  
  it('App contains Login component', () => {
    const wrapper = shallow(<App isLoggedIn={false} />);
    const component = wrapper.find(Login);
    expect(component.exists()).toBe(true);
  });
  
  it('App contains Footer component', () => {
    const wrapper = shallow(<App />);
    const component = wrapper.find(Footer);
    expect(component.exists()).toBe(true);
  });

  it('calls logOut and displays alert when ctrl+h is pressed', () => {
    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<App isLoggedIn={true} logOut={logOutMock} />);
    
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();
    
    alertMock.mockRestore();
  });
});