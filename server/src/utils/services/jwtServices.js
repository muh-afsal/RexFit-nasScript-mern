// tokenService.js
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    try {
        return jwt.sign(
            { 
                id: user._id, 
                email: user.email, 
                role: user.role 
            }, 
            process.env.JWT_SECRET || 'your-secret-key', 
            { 
                expiresIn: '1d',
                issuer: 'RexFit-Auth-Service'
            }
        );
    } catch (error) {
        console.error('Access Token Generation Error:', error);
        throw new Error('Failed to generate access token');
    }
};

export const generateRefreshToken = (user) => {
    try {
        return jwt.sign(
            { 
                id: user._id, 
                email: user.email, 
                role: user.role 
            }, 
            process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key', 
            { 
                expiresIn: '7d',
                issuer: 'RexFit-Auth-Service'
            }
        );
    } catch (error) {
        console.error('Refresh Token Generation Error:', error);
        throw new Error('Failed to generate refresh token');
    }
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(
            token, 
            process.env.JWT_SECRET || 'your-secret-key'
        );
    } catch (error) {
        console.error('Access Token Verification Error:', error);
        throw new Error('Invalid or expired access token');
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(
            token, 
            process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key'
        );
    } catch (error) {
        console.error('Refresh Token Verification Error:', error);
        throw new Error('Invalid or expired refresh token');
    }
};

export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        console.error('Token Decoding Error:', error);
        throw new Error('Failed to decode token');
    }
};