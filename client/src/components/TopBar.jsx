import React from 'react';
import { Navbar, NavItem, Icon, Dropdown, Divider, Button } from 'react-materialize'

const TopBar = ({  }) => (
  <div>
    <Navbar brand={<img src='../images/logo.png' className="logo" />} alignLinks="right" className="light-blue">
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
      <NavItem href="/">
        <Icon>
          settings
        </Icon>
      </NavItem>
    </Navbar>
  </div>
);


export default TopBar;