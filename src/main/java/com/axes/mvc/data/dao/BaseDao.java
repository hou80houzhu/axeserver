package com.axes.mvc.data.dao;

import com.axes.mvc.ConnectionManager.BaseConnection;
import com.axes.mvc.ControlCenter;
import com.axes.mvc.SessionState;
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
