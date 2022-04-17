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

const buildLi = (site) => {
    const li = newEl('li');
    const label = newEl('label');
    const cb = newEl('input', {type: 'checkbox', value: site.url, 'checked': 'checked'});
    const title = newEl('span', {}, site.title);
    label.appendChild(cb);
    label.appendChild(title);
    li.appendChild(label);
    return li;
}

const rootEl = document.body.querySelector('#root');
const sites = parseUrlParams();
const list = newEl('ul');
sites.forEach((site) => {
    const li = buildLi(site);
    list.appendChild(li);
});
rootEl.appendChild(list);

const button = newEl('button', {}, 'まとめて開く');
button.addEventListener('click', () => {
    sites.forEach((site) => {
        window.open(site.url, '_blank');
    });
});
const p = newEl('p');
p.appendChild(button);

rootEl.appendChild(p);
