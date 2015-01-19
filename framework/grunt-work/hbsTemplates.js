this["ADF"] = this["ADF"] || {};
this["ADF"]["templates"] = this["ADF"]["templates"] || {};

this["ADF"]["templates"]["dialog"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<header class=\"dialog-header\">\r\n	";
  stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"header","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n</header>\r\n<section class=\"dialog-body\">\r\n	";
  stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n</section>\r\n<footer class=\"dialog-footer\">\r\n	";
  stack1 = ((helper = (helper = helpers.footer || (depth0 != null ? depth0.footer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"footer","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</footer>";
},"useData":true});



this["ADF"]["templates"]["dropdownMenu"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "				";
  stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "				<li>\r\n					<a\r\n						href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\"\r\n						class=\""
    + escapeExpression(((helper = (helper = helpers.itemClass || (depth0 != null ? depth0.itemClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"itemClass","hash":{},"data":data}) : helper)))
    + "\"\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "						>\r\n						";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n					</a>\r\n				</li>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\""
    + escapeExpression(((helper = (helper = helpers.wrapClass || (depth0 != null ? depth0.wrapClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"wrapClass","hash":{},"data":data}) : helper)))
    + " dropdown-wrapper\">\r\n  	<div class=\"grid-action grid-dropdown dropdown-inner\">\r\n    	<button type=\"button\" class=\"dropdown-toggle dropdown-label\">"
    + escapeExpression(((helper = (helper = helpers.buttonLabel || (depth0 != null ? depth0.buttonLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"buttonLabel","hash":{},"data":data}) : helper)))
    + "</button>\r\n    	<button type=\"button\" class=\"dropdown-toggle-caret dropdown-toggle\">\r\n      		<span class=\"caret\">&#xf0d7;</span>\r\n    	</button>\r\n    	<ul class=\"dropdown-menu hide\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.primaryOptions : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      		<li class=\"divider\"></li>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.footerOptions : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    	</ul>\r\n  	</div>\r\n</div>";
},"useData":true});



this["ADF"]["templates"]["dropdownSelectItem"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"parent","hash":{},"data":data}) : helper)))
    + "-";
},"3":function(depth0,helpers,partials,data) {
  return "checked";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<li>\r\n	<input type=\"checkbox\" id=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.parent : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.checked : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\r\n	<label for=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.parent : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\r\n</li>";
},"useData":true});



this["ADF"]["templates"]["formRow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "	<div class=\"form-row row\">\r\n		<div class=\"grid-spacer layout-grid-3\">&nbsp;</div>\r\n		<div class=\"form-input-notes layout-grid-6\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, placeat!</div>\r\n	</div>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "            <span class=\"form-input-addon icon-tooltip icon form-tooltip tooltip-icon-inline\"><span class=\"tooltip\">";
  stack1 = ((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></span>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.html_prefix : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<div\r\n    class=\"form-row row "
    + escapeExpression(((helper = (helper = helpers.wrapClass || (depth0 != null ? depth0.wrapClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"wrapClass","hash":{},"data":data}) : helper)))
    + "\"\r\n    id=\""
    + escapeExpression(((helper = (helper = helpers.wrapId || (depth0 != null ? depth0.wrapId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"wrapId","hash":{},"data":data}) : helper)))
    + "\"\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    >\r\n\r\n    <label for=\"p_in_promo_id\" class=\"layout-grid-3\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\r\n    <div class=\"form-input layout-grid-6 layout-grid\">\r\n        ";
  stack1 = ((helper = (helper = helpers.inputField || (depth0 != null ? depth0.inputField : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inputField","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\r\n</div>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.html_suffix : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["gridCell"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<td data-column-select-priority=\""
    + escapeExpression(((helper = (helper = helpers.columnSelectPriority || (depth0 != null ? depth0.columnSelectPriority : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"columnSelectPriority","hash":{},"data":data}) : helper)))
    + "\" data-header-id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + escapeExpression(((helper = (helper = helpers.wrapClass || (depth0 != null ? depth0.wrapClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"wrapClass","hash":{},"data":data}) : helper)))
    + "\">\r\n    ";
  stack1 = ((helper = (helper = helpers.inputField || (depth0 != null ? depth0.inputField : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inputField","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</td>";
},"useData":true});



this["ADF"]["templates"]["gridHeaderCell"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "has-tooltip";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "        <i class=\"icon icon-tooltip\">\r\n		    <span class=\"tooltip\">\r\n		      	";
  stack1 = ((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n	    	</span>\r\n    	</i>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<th data-column-select-priority=\""
    + escapeExpression(((helper = (helper = helpers.columnSelectPriority || (depth0 != null ? depth0.columnSelectPriority : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"columnSelectPriority","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-column-index=\""
    + escapeExpression(((helper = (helper = helpers.colIndex || (depth0 != null ? depth0.colIndex : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"colIndex","hash":{},"data":data}) : helper)))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n    ";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</th>";
},"useData":true});



this["ADF"]["templates"]["gridRow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "        ";
  stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<tr id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + escapeExpression(((helper = (helper = helpers.rowClass || (depth0 != null ? depth0.rowClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rowClass","hash":{},"data":data}) : helper)))
    + "\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.cells : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</tr>";
},"useData":true});



this["ADF"]["templates"]["gridWrapper"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "                ";
  stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"auto-admin-grid-wrapper\">\r\n    ";
  stack1 = ((helper = (helper = helpers.colSelect || (depth0 != null ? depth0.colSelect : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"colSelect","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n	<table class=\"auto-admin-grid\" data-column-lkup-url=\"json/columns.json\">\r\n		<thead>\r\n			<tr>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.headers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </tr>\r\n		</thead>\r\n		<tbody>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.records : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		</tbody>\r\n	</table>\r\n	<form action=\"json/file-upload.json\" method=\"POST\" enctype=\"multipart/form-data\"></form>\r\n	<div class=\"upload-drop-zone\"></div>\r\n</div>";
},"useData":true});



this["ADF"]["templates"]["inputHelperSelect2Record"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "    <i class=\"icon icon-tooltip select2-help-text\">\r\n        <span class=\"tooltip\">\r\n            ";
  stack1 = ((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n        </span>\r\n    </i>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["inputTypeActions"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <a\r\n    	href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\"\r\n    	class=\"btn btn-"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.actionClass || (depth0 != null ? depth0.actionClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"actionClass","hash":{},"data":data}) : helper)))
    + "\"\r\n    	data-action-type=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"\r\n    	title=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    >\r\n    <svg viewBox=\"0 0 32 32\" class=\"icon\">\r\n        <use xlink:href=\"#icon-"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"></use>\r\n    </svg>\r\n    <span>\r\n        ";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n    </span>\r\n    </a>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\r\n";
},"4":function(depth0,helpers,partials,data) {
  return "    <div class=\"auto-admin-grid-row-messages\"></div>\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.gridRow : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["inputTypeDataLkupDtl"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"auto-admin-grid-overlay-editor\">\r\n	<div class=\"display-value auto-admin-grid-filter-value\">\r\n		";
  stack1 = ((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n	</div>\r\n	<div class=\"overlay-editor\" data-onload-ajax-url=\"json/data-lkup-dtl-grid.json\" data-result-type=\"grid\" data-onload-ajax-target-id=\"data-lkup-dtl-overlay-editor\">\r\n		<div id=\"data-lkup-dtl-overlay-editor\"></div>\r\n		<button type=\"button\" class=\"btn close icon icon-done\">done</button>\r\n	</div>\r\n</div>";
},"useData":true});



this["ADF"]["templates"]["inputTypeDate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <input type=\"date\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"auto-admin-grid-filter-value\">\r\n";
},"useData":true});



this["ADF"]["templates"]["inputTypeEmail"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<input type=\"email\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-input-field auto-admin-grid-filter-value\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\">";
},"useData":true});



this["ADF"]["templates"]["inputTypeNumber"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <input type=\"number\" min=\"1\" max=\"9999\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"auto-admin-grid-filter-value\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"useData":true});



this["ADF"]["templates"]["inputTypeReadonly"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <span>"
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "</span> <input type=\"hidden\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\" class=\"auto-admin-grid-filter-value\">\r\n";
},"useData":true});



this["ADF"]["templates"]["inputTypeSelect"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "		<option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(((helpers.optionSelected || (depth0 && depth0.optionSelected) || helperMissing).call(depth0, (depth0 != null ? depth0.value : depth0), (depths[1] != null ? depths[1].currentValue : depths[1]), {"name":"optionSelected","hash":{},"data":data})))
    + ">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<select name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"auto-admin-grid-filter-value\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select>";
},"useData":true,"useDepths":true});



this["ADF"]["templates"]["inputTypeSelect2"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "multiple";
  },"3":function(depth0,helpers,partials,data) {
  return "      <option></option>\r\n";
  },"5":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "      <option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(6, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((helpers.optionSelected || (depth0 && depth0.optionSelected) || helperMissing).call(depth0, (depth0 != null ? depth0.value : depth0), (depths[1] != null ? depths[1].currentValue : depths[1]), {"name":"optionSelected","hash":{},"data":data})))
    + ">";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"if","hash":{},"fn":this.program(8, data, depths),"inverse":this.program(10, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</option>\r\n";
},"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return " data-tooltip=\""
    + escapeExpression(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" ";
},"8":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0));
  },"10":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <select class=\"select2 form-input-field auto-admin-grid-filter-value "
    + escapeExpression(((helper = (helper = helpers.inputClass || (depth0 != null ? depth0.inputClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inputClass","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.multiple : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\r\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.required : depth0), {"name":"unless","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </select><!-- /.select2 -->\r\n";
},"useData":true,"useDepths":true});



this["ADF"]["templates"]["inputTypeText"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<input type=\"text\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-input-field auto-admin-grid-filter-value\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\">";
},"useData":true});



this["ADF"]["templates"]["inputTypeTextarea"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <textarea name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"auto-admin-grid-filter-value\"></textarea>\r\n";
},"useData":true});