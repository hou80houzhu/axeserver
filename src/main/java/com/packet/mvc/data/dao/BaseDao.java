package com.packet.mvc.data.dao;

import com.packet.mvc.ConnectionManager.BaseConnection;
import com.packet.mvc.ControlCenter;
import com.packet.mvc.SessionState;
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
