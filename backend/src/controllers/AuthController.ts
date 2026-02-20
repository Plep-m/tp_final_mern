/**
 * Auth Controller
 * Handles user registration and login
 */

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { UserRole } from '@ligue-sportive/shared';
import type { IUserResponse } from '@ligue-sportive/shared';

export class AuthController {
  // POST /api/auth/register
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validation
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: 'Email already in use' });
        return;
      }

      // Create user
      const user = new User({
        email,
        password,
        firstName,
        lastName,
        role: UserRole.MEMBER,
      });

      await user.save();

      // Generate token
      const secret = process.env.JWT_SECRET || 'secret';
      const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role } as any,
        secret as string,
        { expiresIn } as any
      );

      const userResponse: IUserResponse = {
        _id: user._id?.toString() || '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      res.status(201).json({ user: userResponse, token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  // POST /api/auth/login
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password required' });
        return;
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Generate token
      const secret = process.env.JWT_SECRET || 'secret';
      const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role } as any,
        secret as string,
        { expiresIn } as any
      );

      const userResponse: IUserResponse = {
        _id: user._id?.toString() || '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      res.status(200).json({ user: userResponse, token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}
