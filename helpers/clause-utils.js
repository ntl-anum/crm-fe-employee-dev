// utils/clause-utils.js

export function initializeClauseFunctions() {
  if (typeof window === "undefined") return;

  window.addClause = function (listId, withSub) {
    const ol = document.getElementById(listId);
    const li = document.createElement("li");
    const section = listId.split("-")[1];
    const index = ol.children.length + 1;
    const clauseNumber = `${section}.${index}`;

    li.innerHTML = `
      <div class="d-flex align-items-center mb-2 gap-2">
        <span class="" style="font-weight:bold;margin-right:10px">${clauseNumber}</span> 
        <input type="text" class="form-control form-control-sm clause-input flex-grow-1" placeholder="${clauseNumber}">
        ${withSub ? `<button class="btn btn-sm btn-outline-secondary" style="padding:6px 10px;margin-left: 4px;" onclick="addSub(this)">+</button>` : ''}
        <button class="btn btn-sm btn-outline-danger" style="padding:6px 10px;margin-left: 4px;" onclick="deleteClause(this)">✖</button>
      </div>
      ${withSub ? `<ol class="clause-list ms-4 mt-1" style="list-style-type: none;" id="${listId}-${clauseNumber}"></ol>` : ''}
    `;
    ol.appendChild(li);
  };

  window.addSub = function (btn) {
    const li = btn.closest("li");
    const ol = li.querySelector("ol");
    const index = ol.children.length + 1;
    const parentNumber = li.querySelector("input")?.placeholder || "1";
    const clauseNumber = `${parentNumber}.${index}`;

    const subLi = document.createElement("li");
    subLi.innerHTML = `
      <div class="d-flex align-items-center mb-2 gap-2">
        <span class="fw-bold me-2" style="font-weight:bold;margin-right:10px">${clauseNumber}</span> 
        <input type="text" class="form-control form-control-sm clause-input flex-grow-1" placeholder="${clauseNumber}">
        <button class="btn btn-sm btn-outline-secondary" style="padding:6px 10px;margin-left: 4px;" onclick="addSub(this)">+</button>
        <button class="btn btn-sm btn-outline-danger" style="padding:6px 10px;margin-left: 4px;" onclick="deleteClause(this)">✖</button>
      </div>
      <ol class="clause-list ms-4 mt-1" style="list-style-type: none;"></ol>
    `;
    ol.appendChild(subLi);
  };

  window.deleteClause = function (btn) {
    btn.closest("li").remove();
  };
}
