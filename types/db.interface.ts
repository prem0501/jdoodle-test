import type { Model, ModelStatic, Sequelize } from 'sequelize';

export interface Models {
	[key: string]: ModelStatic<Model<any, any>>;
}

export interface ModelWithFKeyMap {
	[key: string]: Array<ModelStatic<Model<any, any>>>;
}
export type DB = Models &
	ModelWithFKeyMap & {
		sequelize?: Sequelize;
	};
export interface ModelWithAssociate extends Model {
	sequelize: Sequelize;
	init(sequelize: Sequelize): ModelStatic<Model<any, any>>;
	associate?(models: Models): void;
}

export interface RespType {
	status: boolean;
	data?: Model<any, any>[] | null;
	error?: any;
}
