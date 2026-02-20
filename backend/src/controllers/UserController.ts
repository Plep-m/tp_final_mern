/**
 * User Controller  
 * Handles user management (CRUD operations - Admin only)
 */

import { Request, Response } from 'express';
import { User } from '../models/User';
import type { IUserResponse } from '@ligue-sportive/shared';

export class UserController {
  // GET /api/users
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find().select('-password');
      const userResponses: IUserResponse[] = users.map((user) => ({
        _id: user._id?.toString() || '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }));
      res.status(200).json(userResponses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // GET /api/users/:id
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password');

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const userResponse: IUserResponse = {
        _id: user._id?.toString() || '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      res.status(200).json(userResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  // PUT /api/users/:id
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { firstName, lastName, role } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, role },
        { new: true }
      ).select('-password');

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const userResponse: IUserResponse = {
        _id: user._id?.toString() || '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      res.status(200).json(userResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  // DELETE /api/users/:id
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
