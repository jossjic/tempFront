import { paths } from "@lib/api/owaru"; 
import { API } from "@lib/api/constants";
import { API_Token } from "@lib/api/models/user/user";
import { ErrorObj, ErrorResponse } from "@type/response";
import { useEffect, useState } from "react";
import useFetch from "use-http";

type Res = API_Token & ErrorResponse;

export type EndpointStructure = paths["/api/login/access-token"]["post"];
export type RequestBody = EndpointStructure["requestBody"]["content"]["application/x-www-form-urlencoded"];

const useLogin = () => {
	const [error, setError] = useState<ErrorObj | undefined>(undefined);
	const { post, response, loading, error: err, cache } = useFetch<Res>(API.URL);
	const [data, setData] = useState<API_Token | undefined>(undefined);

	const login = async (email: string, password: string) => {
		setError(undefined);
		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);
		formData.append("grant_type", "password");

		const path =API.AUTH.LOGIN;
		cache.clear();
		post(path, formData).catch((e) => {
			setError({
				error: "Error",
				message: e.message,
			});
		});
	};

	useEffect(() => {
		if (!loading && response) {
			if (response.ok && response.data?.access_token) {
				// setData is needed for ui update
				setData(response.data);
			} else if (response.data && response.data.detail) {
				const error = response.data as ErrorResponse;
				if (typeof error.detail === "string") {
					setError({
						error: "Error",
						message: error.detail,
						code: response.status,
					});
				} else {
					setError({
						error: "Error",
						message: error.detail.reduce((acc, cur) => acc + cur.msg + '\n', ""),
						code: response.status,
						api_error: error.detail,
					});
				}
			} else if (response.status === 404 || response.status === 403) {
				setError({
					error: "not_found",
					message: "No encontrado",
					code: 404,
				});
			} else if (response.status === 401) {
				setError({
					error: "unauthorized",
					message: "Usuario o contraseña incorrecta",
					code: 401,
				});
			}
		} else if (err) {
			setError({
				error: "Error",
				message: err.message,
				code: 500,
			});
		}
	}, [response, err, loading]);

	return {
		login,
		data: data,
		loading,
		error,
		setData,
	};
};

export default useLogin;
