# Mikhael Moraes · Advogado — Landing Page

Landing page de página única (one-page) recriada a partir do site original no Canva, mantendo a mesma identidade visual.

**Stack:** HTML5 + CSS3 + JavaScript puro (sem frameworks, sem build).

## Estrutura

```
index.html        # página única com as 6 seções
css/style.css     # estilos (variáveis de cor e fonte em :root)
js/main.js        # menu hambúrguer, seção ativa no menu, voltar ao topo
assets/           # imagens WebP, ícones, favicon e imagem Open Graph
```

Seções: `#inicio`, `#sobre`, `#areas`, `#como-funciona`, `#combinados`, `#contato`.

## Rodar localmente

Abra o `index.html` no navegador ou use um servidor estático:

```bash
npx http-server . -p 8080
```

## Publicar

- **Netlify:** arraste a pasta do projeto em https://app.netlify.com/drop
- **Vercel:** `npx vercel` e depois `npx vercel --prod`

Após publicar, troque o caminho de `og:image` no `index.html` pela URL completa do domínio.
