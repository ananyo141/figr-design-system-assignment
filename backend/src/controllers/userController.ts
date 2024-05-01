import { hashData, verifyHashedData } from '@utils/hashData';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import mongoose from 'mongoose';

import CustomErrors from '@errors/index';
import User from '@models/user';
import asyncWrapper from '@utils/asyncWrapper';
import { createToken } from '@utils/createJWT';
import { httpResponse } from '@utils/httpResponse';

export const loginUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    // Find admin by email
    const user = await User.findOne({ email });

    if (user == null)
      return next(new CustomErrors.NotFoundError('User not found'));

    // Compare entered password with hashed password in the database
    const passwordMatch = await verifyHashedData(password, user.password);

    if (!passwordMatch)
      return next(new CustomErrors.UnauthorizedError('Invalid Password'));

    // Create and sign a JWT

    const token = createToken(user._id.toString());

    res
      .status(StatusCodes.OK)
      .json(httpResponse(true, 'Successfully logged in', { token }));
  }
);

export const registerUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // hash the password
    const hashedPassword = await hashData(req.body.password);
    // Check if user with the email already exists
    try {
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(StatusCodes.CREATED).json(
        httpResponse(true, 'User registered successfully', {
          ...user.toObject(),
          password: undefined,
        })
      );
    } catch (error: any) {
      if (error.code === 11000)
        return next(
          new CustomErrors.BadRequestError(
            'User with that email / number already exists'
          )
        );
      return next(new CustomErrors.InternalServerError(error.message));
    }
  }
);

export const getProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.userId) } },
      { $limit: 1 },
      { $project: { password: 0 } },
    ]);
    if (user === null || user.length === 0)
      return next(new CustomErrors.NotFoundError('User not found'));
    res.status(StatusCodes.OK).json(httpResponse(true, 'User found', user[0]));
  }
);

export const updateProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        { ...req.body },
        { new: true }
      );

      if (user == null) {
        return next(new CustomErrors.NotFoundError('User not found'));
      }

      res.status(StatusCodes.OK).json(
        httpResponse(true, 'User updated successfully', {
          ...user.toObject(),
        })
      );
    } catch (error: any) {
      if (error.code === 11000)
        return next(
          new CustomErrors.BadRequestError(
            'User with that email / number already exists'
          )
        );
      next(error);
    }
  }
);

export const updatePassword = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('Request body', req.body);
    const { email, OTP, newPassword } = req.body;
    console.log(email, OTP, newPassword);
    if (email == null || OTP == null)
      return next(
        new CustomErrors.BadRequestError('Email and OTP are required')
      );
    try {
      const hashedPassword = await hashData(newPassword);
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          password: hashedPassword,
        },
        { new: true }
      );

      if (user == null) {
        return next(new CustomErrors.NotFoundError('User not found'));
      }
      // Create and sign a JWT
      const token = createToken(
        user._id.toString(),
      );
      res.status(StatusCodes.OK).json(
        httpResponse(
          true,
          'Password updated successfully and new token issued',
          {
            ...user.toObject(),
            token,
          }
        )
      );
    } catch (error: any) {
      if (error.code === 11000)
        return next(
          new CustomErrors.BadRequestError(
            'User with that email / number already exists'
          )
        );
      next(error);
    }
  }
);
