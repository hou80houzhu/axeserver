package com.brooder.mvc.data.dao;

import com.brooder.mvc.ConnectionManager.BaseConnection;
import com.brooder.mvc.ControlCenter;
import com.brooder.mvc.SessionState;
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
