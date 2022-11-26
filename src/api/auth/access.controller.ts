import { Request, RequestHandler, Response } from 'express';
import * as AccessService from './access.service';
import {
	IAddAccessTypeReq,
	IDeleteAccessTypeReq,
	IUpdateAccessTypeReq,
} from './auth.model';
/**
 * Get access types records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getAccessTypes: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const accessTypes = await AccessService.getAccessTypes();

		res.status(200).json({
			accessTypes,
		});
	} catch (error) {
		console.error(
			'[access.controller][getAccessTypes][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when fetching access types',
		});
	}
};

/**
 * Inserts a new access type record based
 *
 * @param req Express IAddAccessTypeReq
 * @param res Express Response
 */
export const addAccessType: RequestHandler = async (
	req: IAddAccessTypeReq,
	res: Response
) => {
	try {
		const result = await AccessService.addAccessType(req.body);
		res.status(200).json({
			result,
		});
	} catch (error) {
		console.error(
			'[access.controller][addAccessType][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when adding new access type',
		});
	}
};

/**
 * Updates existing access type record
 *
 * @param req Express IUpdateAccessTypeReq
 * @param res Express Response
 */
// @ts-ignore
export const updateAccessType: RequestHandler = async (
	req: IUpdateAccessTypeReq,
	res: Response
) => {
	try {
		const result = await AccessService.updateAccessType({
			...req.body,
			access_id: req.params.access_id,
		});

		res.status(200).json({
			result,
		});
	} catch (error) {
		console.error(
			'[access.controller][updateAccessType][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when updating accesss type',
		});
	}
};

/**
 * deletes a access type
 *
 * @param req Express IDeleteAccessTypeReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteAccessType: RequestHandler = async (
	req: IDeleteAccessTypeReq,
	res: Response
) => {
	try {
		const result = await AccessService.deleteAccessType(req.params.access_id);

		res.status(200).json({
			result,
		});
	} catch (error) {
		console.error(
			'[access.controller][deleteAccessType][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when deleting access type',
		});
	}
};
