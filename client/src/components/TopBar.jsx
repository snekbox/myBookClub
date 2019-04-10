import React from 'react';
import { Navbar, NavItem, Icon, Dropdown, Divider, Button } from 'react-materialize'

const TopBar = ({ chooseView }) => (
  <div>
    <Navbar brand={<img src='../images/logo.png' className="logo" onClick={() => chooseView('groups')} />} alignLinks="right" className="light-blue">
      <NavItem onClick={() => chooseView('groups')} >
        <Icon>
          home
        </Icon>
      </NavItem>
      <NavItem href="/">
        <Icon>
          search
        </Icon>
      </NavItem>
      <NavItem href="/">
        <Icon>
          add_circle_outline
        </Icon>
      </NavItem>
      <NavItem href="/">
        <Icon>
          video_call
        </Icon>
      </NavItem>
      <NavItem onClick={() => chooseView('settings')} >
        <Icon>
          settings
        </Icon>
      </NavItem>
    </Navbar>
  </div>
);


export default TopBar;