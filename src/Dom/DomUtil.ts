
export const appendChildToElement = (id: string, element: HTMLElement) => {
    const parent = document.getElementById(id);
    parent.appendChild(element);
};
