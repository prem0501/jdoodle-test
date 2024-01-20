import { Model } from 'sequelize';
import db from '../../models';

export const onDeleteCascade = async (
	instance: Model<any, any>,
	_: { [key: string]: any }
) => {
	const modelName = instance.constructor.name;
	if (db.foreignKeyMapping && modelName in db.foreignKeyMapping) {
		const { fkey, models } = db.foreignKeyMapping[modelName];
		const ps = models.map((model) => {
			return model.destroy({
				where: {
					[fkey]: instance.dataValues.id,
				},
			});
		});
		await Promise.all(ps);
	}
};
