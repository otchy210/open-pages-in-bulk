const parseUrlParams = () => {
    const url = new URL(location.href);
    const params = url.searchParams;
    const sites = params.get('sites');
    if (!sites) {
        return [];
    }
    return JSON.parse(sites).map(([title, url]) => {
        return { title, url };
    });
}

const newEl = (tagName, attrs = {}, innerText = '') => {
    const el = document.createElement(tagName);
    Object.entries(attrs).forEach(([name, value]) => {
        el.setAttribute(name, value);
    })
    el.innerText = innerText;
    return el;
}

const buildBlock = (site) => {
    const title = newEl('div', {}, site.title);
    const iframe = newEl('iframe', {src: site.url});
    const div = newEl('div');
    div.appendChild(title);
    div.appendChild(iframe);
    return div;
}

const rootEl = document.body.querySelector('#root');
const sites = parseUrlParams();
sites.forEach((site) => {
    // window.open(site.url);
    const block = buildBlock(site);
    rootEl.appendChild(block);
})
