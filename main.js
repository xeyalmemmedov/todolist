let container = document.querySelector('.container');
let todoList = document.querySelector('.todolist');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
let removeBtn = document.querySelectorAll('.remove-btn');
let todoArr = Array.from(document.querySelectorAll('li'));
let input = document.querySelector('.input');

if (todoArr.length !== 0) {
    todoList.style.display = 'block';
    input.style.display = 'none';
}
addBtn.addEventListener('click', () => {
    if (input.style.display === 'none' || input.style.display === '') {
        input.style.display = 'block';
    } else {
        let newTodo = input.value; //burada inputun deyerini aldiq.

        let li = document.createElement('li');
        li.draggable = true;
        let p = document.createElement('p');
        if(newTodo.length<=30){
            p.textContent = newTodo;
        }else{
            p.textContent = newTodo.slice(0, 30)+'...';
        }
        li.append(p);
        todoList.style.display = 'block';
        input.style.display = 'none';
        let removeBtn = document.createElement('button');
        removeBtn.classList = 'remove-btn';
        removeBtn.type = 'button';
        removeBtn.innerHTML = '<img src="./img/svg/delete.svg" alt="remove">';
        li.append(removeBtn);
        removeBtn.addEventListener('click', () => {
            li.remove();

            if(ul.children.length===0){
                todoList.style.display = 'none';
                input.style.display = 'block';
            }
        })
        ul.append(li);

        li.addEventListener('dblclick', () => {
            input.style.display = 'none';
            let updateIn = document.createElement('input');
            updateIn.classList = 'update';
            updateIn.value = newTodo;
            li.textContent = '';
            li.append(updateIn, removeBtn);
            updateIn.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    newTodo = updateIn.value;
                    li.textContent = updateIn.value.slice(0, 30)+'...';
                    li.append(removeBtn);
                }
            })
            updateIn.addEventListener('blur', () => {
                newTodo = updateIn.value;
                li.textContent = updateIn.value.slice(0, 30)+'...';
                li.append(removeBtn);
            })
        })
        input.value = '';
        addDragAndDropEvents(li);
    }
});
// sort strat here
const sortTop = document.querySelector('.sort-top');
const sortBot = document.querySelector('.sort-bottom');
sortTop.style.display = 'none';
sortBot.addEventListener('click', ()=>{
    sortTop.style.display = 'block';
    sortBot.style.display = 'none';
    let items = Array.from(ul.querySelectorAll('li'));
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    ul.innerHTML = '';
    items.forEach(item=>{
        let li = document.createElement('li');
        li.append(item);
        ul.append(li);
    })
});
sortTop.addEventListener('click', ()=>{
    sortBot.style.display = 'block';
    sortTop.style.display = 'none';
    let items = Array.from(ul.querySelectorAll('li'));
    items.sort((a, b) => b.textContent.localeCompare(a.textContent));
    ul.innerHTML = '';
    items.forEach(item=>{
        let li = document.createElement('li');
        li.append(item);
        ul.append(li);
    })
})
// sort end here

// drag&drop start here
function addDragAndDropEvents(item) {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
}
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerHTML);
    e.target.classList.add('dragging');
}
function dragOver(e) {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const currentItem = e.target.closest('li'); 
    if (currentItem && currentItem !== draggingItem) {
        const bounding = currentItem.getBoundingClientRect();
        const offset = e.clientY - bounding.top - bounding.height / 2;
        if (offset > 0) {
            currentItem.after(draggingItem);
        } else {
            currentItem.before(draggingItem);
        }
    }
}
function drop(e) {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    if (draggingItem) {
        draggingItem.classList.remove('dragging');
    }
}
Array.from(ul.children).forEach(item => {
    addDragAndDropEvents(item);
});
// drag&drop end here

