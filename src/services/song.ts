import songReposiroty from '../repositories/songs.ts';

/**
 * 楽曲情報を取得する
 * @param {number} id 楽曲ID
 * @return {Song} 楽曲情報
 */
const getSong = (id: number) => songReposiroty.find(id);

export default { getSong };
