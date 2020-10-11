import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { MenuItemLink, UserMenu as UIUserMenu, useTranslate } from 'react-admin';

import ProfileIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import { useQueryWithStore } from 'ra-core';

import { models } from 'stf-core';

import { getPlayerId } from '../utils/getPlayerId';

const useStyles = makeStyles({
  avatar: {
    height: 30,
    width: 30,
  },
});

const ConfigurationMenu = forwardRef((props, ref) => {
  const translate = useTranslate();
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  return (
    <>
      <MenuItemLink
        sidebarIsOpen={open}
        ref={ref}
        to={`/players/${getPlayerId()}/basic`}
        primaryText={translate('layout.userMenu.profile')}
        leftIcon={<ProfileIcon />}
        onClick={props.onClick}
      />
      <MenuItemLink
        sidebarIsOpen={open}
        ref={ref}
        to="/settings"
        primaryText={translate('layout.userMenu.settings')}
        leftIcon={<SettingsIcon />}
        onClick={props.onClick}
      />
    </>
  );
});

const UserMenu = (props) => {
  const classes = useStyles();
  const { data: player, loading, error } = useQueryWithStore({
    type: 'getOne',
    resource: 'players',
    payload: { id: getPlayerId() },
  });

  const noAvatar = !player || !player[models.players.fields.avatar] || loading || error;

  if (noAvatar) {
    return (
      <UIUserMenu {...props}>
        <ConfigurationMenu />
      </UIUserMenu>
    );
  }

  return (
    <UIUserMenu
      {...props}
      icon={<Avatar className={classes.avatar} src={player[models.players.fields.avatar]} />}
    >
      <ConfigurationMenu />
    </UIUserMenu>
  );
};

export default UserMenu;
