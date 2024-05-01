import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomErrors from '@errors/index';

import asyncWrapper from '@utils/asyncWrapper';
import Project from '@models/project';
import { httpResponse } from '@utils/httpResponse';

export const getUserProjects = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const projects = await Project.find({ owner: userId });
    if (!projects || projects.length === 0) {
      return next(
        new CustomErrors.NotFoundError('No projects found for this user')
      );
    }
    res
      .status(StatusCodes.OK)
      .json(httpResponse(true, 'Projects found', projects));
  }
);

export const createProject = asyncWrapper(
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const projectData = {
        ...req.body,
        owner: userId,
      };
      const project = await Project.create(projectData);
      res.status(StatusCodes.CREATED).json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: error.message || 'Failed to create project.',
        },
      });
    }
  }
);

export const updateProject = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return next(new CustomErrors.NotFoundError('Project not found'));
    }

    if (project.owner.toString() !== userId) {
      return next(new CustomErrors.ForbiddenError('Access denied'));
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(StatusCodes.OK)
      .json(httpResponse(true, 'Project updated', updatedProject));
  }
);

export const getProjectById = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return next(new CustomErrors.NotFoundError('Project not found'));
    }

    if (project.owner.toString() !== userId) {
      return next(new CustomErrors.ForbiddenError('Access denied'));
    }

    res.status(StatusCodes.OK).json(
      httpResponse(true, 'Project found', {
        project,
        enums: {
          radiusBaseSize: [4, 8, 12, 16, 32],
          radiusMultiplier: [1, 2],
          spacingBaseSize: [6, 8, 12],
        },
      })
    );
  }
);
