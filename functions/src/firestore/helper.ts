export const nullFilter = <T>(data: T) => {
	const mod = data
	Object.entries(mod).forEach(([key, val]) => {
		if (val == null) { delete mod[key as keyof T] }
	})
	return mod
}

export const idEncoder = (path: string) => {
	return path.replace('/', '--')
}

export const idDecoder = (path: string) => {
	return path.replace('--', '/')
}
