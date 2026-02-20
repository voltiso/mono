// import type React from 'react'

// export function server<P extends { children?: unknown }>(
// 	Client: React.FC<P>,
// ): React.FC<P> {
// 	const name = `server(${Client.name})`
// 	const resultWrapper = {
// 		[name]: ((props: P) => <Client {...props} />) as React.FC<P>,
// 	}

// 	const result = resultWrapper[name]!

// 	result.displayName = `server(${Client.displayName || Client.name})`
// 	return result
// }
