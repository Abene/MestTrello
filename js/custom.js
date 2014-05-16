
var cols = document.querySelectorAll('.pane');
var p = document.querySelectorAll('.tab .taskTab');

var dragSrcEl;
/*Valuable functions for drag effects*/
//Chnaging the opcatity at Drag
function handleDragStart(e) {
  this.style.opacity = '0.4';

  dragSrcEl = this.parentNode;
  this.classList.add('dragging');
}

//Adding some visuals on drag
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
 
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDragEnd(e) {
    this.style.opacity = '1.0';

    Array.prototype.forEach.call(p, function(t) {
      t.classList.remove('dragging');
      t.classList.remove('over');
    });
}


function handleDropOntoTasktab(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (dragSrcEl !== this.parentNode) {
        dragSrcEl.parentNode.removeChild(dragSrcEl);
        this.parentNode.parentNode.appendChild(dragSrcEl);
    }

    return false;
}

function handleDropOntoPane(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    dragSrcEl.parentNode.removeChild(dragSrcEl);
    this.appendChild(dragSrcEl);
    return false;
}


Array.prototype.forEach.call(p, function(col) {
  
  col.addEventListener('dragover', handleDragStart);
  col.addEventListener('dragenter', handleDragEnd);
});

Array.prototype.forEach.call(cols, function(col) {
  col.addEventListener('dragover', handleDragOver);
  col.addEventListener('dragleave', handleDragLeave);
  col.addEventListener('drop', handleDropOntoTasktab);
  col.addEventListener('dragenter', handleDragEnter);
  col.addEventListener('drop', handleDropOntoPane);

});
