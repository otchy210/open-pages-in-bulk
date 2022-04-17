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
        if (value) {
            el.setAttribute(name, value);
        }
    })
    el.innerText = innerText;
    return el;
}

const getCheckboxes = () => {
    return Array.from(document.querySelectorAll('input.site'));
}

const selectSite = (selected) => {
    selected.checked = true;
    getCheckboxes().forEach((cb) => {
        cb.checked = (cb === selected);
    })
}

const onChangeSite = (e) => {
    selectSite(e.target);
}

const buildLi = (site, checked) => {
    const li = newEl('li');
    const label = newEl('label');
    const cb = newEl('input', {type: 'checkbox', class: 'site', value: site.url, checked: checked ? 'checked' : null});
    cb.addEventListener('change', onChangeSite);
    const title = newEl('span', {}, site.title);
    label.appendChild(cb);
    label.appendChild(title);
    li.appendChild(label);
    return li;
}

const rootEl = document.body.querySelector('#root');
const sites = parseUrlParams();
const list = newEl('ul');
sites.forEach((site, i) => {
    const li = buildLi(site, i === 0);
    list.appendChild(li);
});
rootEl.appendChild(list);

const button = newEl('div', {class: 'button'}, '開いて次へ');
button.addEventListener('click', () => {
    const checkboxes = getCheckboxes();
    const currentIndex = checkboxes
        .map((cb, index) => {return {checked: cb.checked, index}} )
        .filter((cb) => cb.checked)[0].index;
    const nextIndex = (currentIndex + 1) % checkboxes.length;
    selectSite(checkboxes[nextIndex]);

    location.href = checkboxes[currentIndex].value;
});
const p = newEl('p');
p.appendChild(button);

rootEl.appendChild(p);
