import React, { useReducer } from 'react';
import axios from 'axios';
import EmailContext from './emailContext';
import emailReducer from './emailReducer';
import {
  GET_EMAILS,
  ADD_EMAIL,
  DELETE_EMAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EMAIL,
  FILTER_EMAILS,
  CLEAR_FILTER,
  EMAIL_ERROR,
  CLEAR_EMAILS
} from '../types';

const EmailState = props => {
  const initialState = {
    emails: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(emailReducer, initialState);

  // 获取邮箱列表
  const getEmails = async () => {
    try {
      const res = await axios.get('/api/emails');

      dispatch({
        type: GET_EMAILS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EMAIL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 添加邮箱
  const addEmail = async email => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/emails', email, config);

      dispatch({
        type: ADD_EMAIL,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EMAIL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 删除邮箱
  const deleteEmail = async id => {
    try {
      await axios.delete(`/api/emails/${id}`);

      dispatch({
        type: DELETE_EMAIL,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: EMAIL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 更新邮箱
  const updateEmail = async email => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/emails/${email._id}`,
        email,
        config
      );

      dispatch({
        type: UPDATE_EMAIL,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EMAIL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 清除邮箱
  const clearEmails = () => {
    dispatch({ type: CLEAR_EMAILS });
  };

  // 设置当前邮箱
  const setCurrent = email => {
    dispatch({ type: SET_CURRENT, payload: email });
  };

  // 清除当前邮箱
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // 过滤邮箱
  const filterEmails = text => {
    dispatch({ type: FILTER_EMAILS, payload: text });
  };

  // 清除过滤器
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <EmailContext.Provider
      value={{
        emails: state.emails,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getEmails,
        addEmail,
        deleteEmail,
        setCurrent,
        clearCurrent,
        updateEmail,
        filterEmails,
        clearFilter,
        clearEmails
      }}
    >
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailState; 