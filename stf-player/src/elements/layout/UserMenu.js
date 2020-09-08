import React, { forwardRef } from 'react';
import { MenuItemLink, UserMenu as UIUserMenu, useTranslate } from 'react-admin';

import ProfileIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import { getPlayerId } from '../../utils/getPlayerId';

const ConfigurationMenu = forwardRef((props, ref) => {
  const translate = useTranslate();
  return (
    <>
      <MenuItemLink
        ref={ref}
        to={`/players/${getPlayerId()}/basic`}
        primaryText="Profile"
        leftIcon={<ProfileIcon />}
        onClick={props.onClick}
      />
      <MenuItemLink
        ref={ref}
        to="/settings"
        primaryText={translate('pos.settings')}
        leftIcon={<SettingsIcon />}
        onClick={props.onClick}
      />
    </>
  );
});

const UserMenu = (props) => (
  <UIUserMenu {...props}>
    <ConfigurationMenu />
  </UIUserMenu>
);

export default UserMenu;
