"use strict";

class BSTable {

  constructor(tableId, options) {

    var defaults = {
      editableColumns: null,           
      $addButton: null,               
      onEdit: function() {},          
      onBeforeDelete: function() {},  
      onDelete: function() {},        
      onAdd: function() {},           
      advanced: {                     
          columnLabel: 'Actions',
          buttonHTML: `<div class="btn-group pull-right">
                <button id="bEdit" type="button" class="btn btn-sm btn-default">
                    <span class="fa fa-edit" > </span>
                </button>
                <button id="bDel" type="button" class="btn btn-sm btn-default">
                    <span class="fa fa-trash" > </span>
                </button>
                <button id="bAcep" type="button" class="btn btn-sm btn-default" style="display:none;">
                    <span class="fa fa-check-circle" > </span>
                </button>
                <button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;">
                    <span class="fa fa-times-circle" > </span>
                </button>
            </div>`
      }
    };

    this.table = $('#' + tableId);
    this.options = $.extend(true, defaults, options);

    this.actionsColumnHTML = '<td name="bstable-actions">' + this.options.advanced.buttonHTML + '</td>'; 
  }

  init() {
    this.table.find('thead tr').append('<th name="bstable-actions">' + this.options.advanced.columnLabel + '</th>');  // Append column to header
    this.table.find('tbody tr').append(this.actionsColumnHTML);

    this._addOnClickEventsToActions(); 

    if (this.options.$addButton != null) {
      let _this = this;
      
      this.options.$addButton.click(function() {
        _this._actionAddRow();
      });
    }
    
    if (this.options.editableColumns != null) {
     
      this.options.editableColumns = this.options.editableColumns.split(',');
    }
  }
  
  destroy() {
    this.table.find('th[name="bstable-actions"]').remove(); 
    this.table.find('td[name="bstable-actions"]').remove(); 
  }

  refresh() {
    this.destroy();
    this.init();
  }

  currentlyEditingRow($row) {
    if ($row.attr('data-status')=='editing') {
        return true;
    } else {
        return false;
    }
  }

  _actionsModeNormal(button) {
    $(button).parent().find('#bAcep').hide();
    $(button).parent().find('#bCanc').hide();
    $(button).parent().find('#bEdit').show();
    $(button).parent().find('#bDel').show();
    var $row = $(button).parents('tr');         
    $row.attr('data-status', '');              
  }
  _actionsModeEdit(button) {
    $(button).parent().find('#bAcep').show();
    $(button).parent().find('#bCanc').show();
    $(button).parent().find('#bEdit').hide();
    $(button).parent().find('#bDel').hide();
    var $row = $(button).parents('tr');         
    $row.attr('data-status', 'editing');        
  }

  _rowEdit(button) {                  
  
    var $row = $(button).parents('tr');       
    console.log($row);
    var $cols = $row.find('td');             
    console.log($cols);
    if (this.currentlyEditingRow($row)) return;    
   
    this._modifyEachColumn(this.options.editableColumns, $cols, function($td) {  
      var content = $td.html();             
      console.log(content);
      var div = '<div style="display: none;">' + content + '</div>';  
      var input = '<input class="form-control input-sm"  data-original-value="' + content + '" value="' + content + '">';
      $td.html(div + input);               
    });
    this._actionsModeEdit(button);
  }
  _rowDelete(button) {                        

    var $row = $(button).parents('tr');       
    this.options.onBeforeDelete($row);
    $row.remove();
    this.options.onDelete();
  }
  _rowAccept(button) {
  
    var $row = $(button).parents('tr');       
    var $cols = $row.find('td');              
    if (!this.currentlyEditingRow($row)) return;   
    
    this._modifyEachColumn(this.options.editableColumns, $cols, function($td) {  
      var cont = $td.find('input').val();     
      $td.html(cont);                         
    });
    this._actionsModeNormal(button);
    this.options.onEdit($row);
  }
  _rowCancel(button) {
    var $row = $(button).parents('tr');      
    var $cols = $row.find('td');              
    if (!this.currentlyEditingRow($row)) return;   

    this._modifyEachColumn(this.options.editableColumns, $cols, function($td) {  
        var cont = $td.find('div').html();    
        $td.html(cont);                       
    });
    this._actionsModeNormal(button);
  }
  _actionAddRow() {

    var $allRows = this.table.find('tbody tr');
    if ($allRows.length==0) { 
      var $row = this.table.find('thead tr');  
      var $cols = $row.find('th');  
      var newColumnHTML = '';
      $cols.each(function() {
        let column = this; 
        if ($(column).attr('name')=='bstable-actions') {
          newColumnHTML = newColumnHTML + actionsColumnHTML;  
        } else {
          newColumnHTML = newColumnHTML + '<td></td>';
        }
      });
      this.table.find('tbody').append('<tr>'+newColumnHTML+'</tr>');
    } else { 
      var $lastRow = this.table.find('tr:last');
      $lastRow.clone().appendTo($lastRow.parent());  
      $lastRow = this.table.find('tr:last');
      var $cols = $lastRow.find('td');  
      $cols.each(function() {
        let column = this; 
        if ($(column).attr('name')=='bstable-actions') {
          
        } else {
          $(column).html('');  
        }
      });
    }
    this._addOnClickEventsToActions();
    this.options.onAdd();
  }

 
  _modifyEachColumn($editableColumns, $cols, howToModify) {
  
    var n = 0;
    $cols.each(function() {
      n++;
      if ($(this).attr('name')=='bstable-actions') return;    
      if (!isEditableColumn(n-1)) return;                     
      howToModify($(this));                                   
    });
    

    function isEditableColumn(columnIndex) {
        if ($editableColumns==null) {                           
            return true;                                        
        } else {                                                
            for (var i = 0; i < $editableColumns.length; i++) {
              if (columnIndex == $editableColumns[i]) return true;
            }
            return false;  
        }
    }
  }

  _addOnClickEventsToActions() {
    let _this = this;
    this.table.find('tbody tr #bEdit').each(function() {let button = this; button.onclick = function() {_this._rowEdit(button)} });
    this.table.find('tbody tr #bDel').each(function() {let button = this; button.onclick = function() {_this._rowDelete(button)} });
    this.table.find('tbody tr #bAcep').each(function() {let button = this; button.onclick = function() {_this._rowAccept(button)} });
    this.table.find('tbody tr #bCanc').each(function() {let button = this; button.onclick = function() {_this._rowCancel(button)} });
  }

  convertTableToCSV(separator) {  

    let _this = this;
    var rowValues = '';
    var tableValues = '';

    _this.table.find('tbody tr').each(function() {
        if (_this.currentlyEditingRow($(this))) {
            $(this).find('#bAcep').click();       
        }
        var $cols = $(this).find('td');          
        rowValues = '';
        $cols.each(function() {
            if ($(this).attr('name')=='bstable-actions') {
            } else {
                rowValues = rowValues + $(this).html() + separator;
            }
        });
        if (rowValues!='') {
            rowValues = rowValues.substr(0, rowValues.length-separator.length); 
        }
        tableValues = tableValues + rowValues + '\n';
    });
    return tableValues;
  }

}

