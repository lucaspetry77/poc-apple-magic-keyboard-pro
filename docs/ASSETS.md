# Imagens e referências

Os cinco renders foram gerados com a ferramenta integrada `image_gen`. O primeiro render em prata definiu a identidade do produto; os demais foram derivados dele para preservar as proporções e as duas teclas.

| Arquivo       | Uso                                           |
| ------------- | --------------------------------------------- |
| `hero-prata`  | Hero e acabamento prata                       |
| `hero-escuro` | Destaques, scroll e acabamento preto espacial |
| `macro-sim`   | Close da gravação e da tecla Sim              |
| `perfil`      | Perfil de alumínio e porta USB-C              |
| `mesa`        | Cena de uso com notebook                      |

Os WebPs em `public/assets/` são os únicos renders incluídos no build. Os PNGs em `design/originals/` preservam as imagens de origem. Os prompts completos estão em `design/prompts.json`.

A direção visual usa a linguagem de páginas de produto Apple. A composição do chat foi estudada na [página oficial do Apple Intelligence](https://www.apple.com/apple-intelligence/): balão cinza para o usuário, resposta no branco e barra de conversa discreta. Nenhuma imagem da página da Apple foi incorporada ao projeto.

Ao substituir um render, mantenha exatamente duas teclas: microfone à esquerda e **Sim** à direita. Gere a versão WebP, preserve o original em `design/originals/` e atualize os prompts e os textos alternativos.
