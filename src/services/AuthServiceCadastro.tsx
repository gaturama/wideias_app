const API_URL =
  "https://wideias.com.br/financeiro/api/externo/appwideiasclientes";
const AUTH_TOKEN =
  "Basic V2lkZWlhc0NsaWVudGVzOmI4Y2Q4ZjNlMTI4MDMyY2I0M2FhMGRiNzRmNmFiNTFk";

export const authCadastro = {
  cadastrarUsuario: async (dados: {
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    telefone: string;
    nascimento: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("nome", dados.nome);
      formData.append("cpf", dados.cpf);
      formData.append("email", dados.email);
      formData.append("senha", dados.senha);
      formData.append("telefone", dados.telefone);
      formData.append("nascimento", dados.nascimento);

      console.log("Enviando dados para API:", {
        url: `${API_URL}/cadastrar`,
        dados: {
          nome: dados.nome,
          cpf: dados.cpf,
          email: dados.email,
          telefone: dados.telefone,
          nascimento: dados.nascimento,
        },
      });

      const response = await fetch(`${API_URL}/cadastrar`, {
        method: "POST",
        headers: {
          Authorization: AUTH_TOKEN,
        },
        body: formData,
      });

      console.log("Status da resposta:", response.status);

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (!response.ok) {
        throw new Error(
          data.message || data.erro || "Erro ao cadastrar usuário",
        );
      }

      return {
        sucesso: true,
        dados: data,
        mensagem: data.mensagem || "Usuário cadastrado com sucesso",
      };
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
      return {
        sucesso: false,
        erro: error.message || "Erro ao cadastrar usuário",
      };
    }
  },

  loginUsuario: async (dados: { email: string; senha: string }) => {
    try {
      const formData = new FormData();
      formData.append("email", dados.email);
      formData.append("senha", dados.senha);

      console.log("Enviando dados para API (Login):", {
        url: `${API_URL}/login`,
        dados: {
          email: dados.email,
        },
      });

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          Authorization: AUTH_TOKEN,
        },
        body: formData,
      });

      console.log("Status da resposta: ", response.status);

      const data = await response.json();
      console.log("Resposta da API: ", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.erro ||
            data.Resultado ||
            "Email ou senha incorretos",
        );
      }

      return {
        sucesso: true,
        dados: data,
        mensagem:
          data.mensagem || data.message || "Login realizado com sucesso!",
        token: data.token || null,
        usuario: data.usuario || null,
      };
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      return {
        sucesso: false,
        erro: error.message || "Erro ao fazer login",
      };
    }
  },
};
