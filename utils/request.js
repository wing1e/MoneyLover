export const request =(options) =>{
	const dataOperation = uniCloud.importObject('DataOperationObj')
	const token = uni.getStorageSync('token')
	const info = {...options,token:token}
	const add = async()=>{
		const res = await dataOperation.add(info)
		return res
	}
	
	return {add}
}