import axios from 'axios';
import axiosInstance from './axiosInstance';

const BASE_URL = '/api/comments';


export const getCommentsByProductId = async (productId) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}
export const getMyComments = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/my`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export const postComment = async (productId, commentData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/add/${productId}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}/remove/${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

export const updateComment = async (commentId, updatedData) => {
    try {
        const response = await axiosInstance.patch(`${BASE_URL}/edit/${commentId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}


