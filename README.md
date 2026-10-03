# Magic Keyboard Pro

[![CI](https://github.com/lucaspetry77/poc-apple-magic-keyboard-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/lucaspetry77/poc-apple-magic-keyboard-pro/actions/workflows/ci.yml)

**Menos teclas. Mais senioridade.**

Uma página de produto satírica, em português, para o teclado dos maiores vibe coders do mundo: uma tecla de microfone e uma tecla **Sim**. Você fala o que quer. A IA escreve o código. Você aprova as permissões.

![Magic Keyboard Pro em prata, com teclas de microfone e Sim](public/assets/hero-prata.webp)

## Rodar localmente

Use Node.js 24 e npm. Com nvm, execute `nvm use` na raiz do projeto.

```sh
npm ci
npm run dev
```

Abra [http://127.0.0.1:5173](http://127.0.0.1:5173). O servidor atualiza a página durante a edição.

```sh
npm run check    # Formatação, sintaxe, imagens e âncoras
npm run build    # Gera e valida dist/
npm run preview  # Serve o build em http://127.0.0.1:4175
npm run format   # Formata o código
```

## Experiência

- Renders originais em prata e preto espacial, macro da tecla, perfil e cena de mesa.
- Galeria de destaques, diálogos de produto e narrativa de scroll reversível.
- Chat inspirado na [página oficial do Apple Intelligence](https://www.apple.com/apple-intelligence/), com três aprovações satíricas.
- Comparação de teclados, seletor de acabamento e compra conceitual.
- Layout responsivo, controles por teclado, foco visível e alternativa de movimento reduzido.

A demonstração usa apenas estados locais. O microfone seleciona um prompt de exemplo; não grava áudio nem chama uma IA. A compra encerra a piada; não coleta dados nem faz cobranças.

## Estrutura

```text
index.html                  Página e conteúdo
src/app.js                  Interações e animações
src/styles.css              Estilos e layouts responsivos
public/assets/              Cinco WebPs usados pelo site
design/originals/           PNGs de origem, fora do build
design/prompts.json         Prompts de geração dos renders
docs/                       Assets e evidências de revisão
scripts/check-site.mjs      Integridade do HTML e dos arquivos
.github/workflows/ci.yml    Validação e build em cada push/PR
```

HTML, CSS e JavaScript nativos. Vite cuida do servidor e do build; Prettier mantém o código formatado. Não há dependências de runtime nem backend.

## Publicação

Execute `npm ci` e `npm run build`, e publique **somente `dist/`** em uma hospedagem estática. Os caminhos relativos permitem servir o projeto na raiz de um domínio ou em uma subpasta.

A CI valida o código e disponibiliza o build como artefato `magic-keyboard-pro-dist` no GitHub Actions. Os renders PNG e a documentação permanecem no repositório, fora do site publicado.

## Design e validação

- [Origem e uso das imagens](docs/ASSETS.md)
- [Revisão visual e funcional](docs/QA.md)
- [Guia de contribuição](CONTRIBUTING.md)

Este é um conceito satírico independente. O produto, o preço e as promessas são ficcionais. Não há afiliação com Apple, OpenAI, Anthropic ou Google; as marcas citadas pertencem a seus respectivos titulares.
