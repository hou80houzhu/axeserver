package com.bright.mvc.data.dao;

import com.bright.mvc.ConnectionManager.BaseConnection;
import com.bright.mvc.ControlCenter;
import com.bright.mvc.SessionState;
import java.sql.SQLException;

public abstract class BaseDao {
    protected BaseConnection getConnection() throws SQLException{
        if (null == ControlCenter.sessionState.get()) {
            SessionState state = new SessionState();
            state.push();
            ControlCenter.sessionState.set(state);
        }
        return ((SessionState)ControlCenter.sessionState.get()).getConnectionManager().getConnection();
    };
}
