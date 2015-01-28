this["ADF"] = this["ADF"] || {};
this["ADF"]["templates"] = this["ADF"]["templates"] || {};

this["ADF"]["templates"]["action"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a\n    href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\"\n    class=\"btn btn-"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.actionClass || (depth0 != null ? depth0.actionClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"actionClass","hash":{},"data":data}) : helper)))
    + "\"\n    data-action-type=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"\n    title=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n<svg viewBox=\"0 0 32 32\" class=\"icon\">\n    <use xlink:href=\"#icon-"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"></use>\n</svg>\n<span>\n    ";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</span>\n</a>";
},"useData":true});



this["ADF"]["templates"]["dialogFormBody"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<section class=\"dialog-body\">\n    ";
  stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n</section>\n<footer class=\"dialog-footer\">\n    ";
  stack1 = ((helper = (helper = helpers.footer || (depth0 != null ? depth0.footer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"footer","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</footer>\n";
},"useData":true});



this["ADF"]["templates"]["dialogFormWrapper"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<dialog class=\"layout-grid\">\n    <header class=\"dialog-header\">\n        ";
  stack1 = ((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"header","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <button class=\"dialog-close\">X</button>\n    </header>\n    <form method=\"post\" class=\"loading form-horizontal adf-form\" action=\""
    + escapeExpression(((helper = (helper = helpers.saveUrl || (depth0 != null ? depth0.saveUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"saveUrl","hash":{},"data":data}) : helper)))
    + "\"></form>\n</dialog>";
},"useData":true});



this["ADF"]["templates"]["dropdownLink"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a\n    href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\"\n    class=\""
    + escapeExpression(((helper = (helper = helpers.itemClass || (depth0 != null ? depth0.itemClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"itemClass","hash":{},"data":data}) : helper)))
    + "\"\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>";
},"useData":true});



this["ADF"]["templates"]["dropdownMenu"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "                ";
  stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "				<li>\n					<a\n						href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\"\n						class=\""
    + escapeExpression(((helper = (helper = helpers.itemClass || (depth0 != null ? depth0.itemClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"itemClass","hash":{},"data":data}) : helper)))
    + "\"\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "						>\n						";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n					</a>\n				</li>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\""
    + escapeExpression(((helper = (helper = helpers.wrapClass || (depth0 != null ? depth0.wrapClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"wrapClass","hash":{},"data":data}) : helper)))
    + " dropdown-wrapper\">\n  	<div class=\"grid-action grid-dropdown dropdown-inner\">\n    	<button type=\"button\" class=\"dropdown-toggle dropdown-label\">"
    + escapeExpression(((helper = (helper = helpers.buttonLabel || (depth0 != null ? depth0.buttonLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"buttonLabel","hash":{},"data":data}) : helper)))
    + "</button>\n    	<button type=\"button\" class=\"dropdown-toggle-caret dropdown-toggle\">\n      		<span class=\"caret\">&#xf0d7;</span>\n    	</button>\n    	<ul class=\"dropdown-menu hide\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.primaryOptions : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      		<li class=\"divider\"></li>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.footerOptions : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    	</ul>\n  	</div>\n</div>";
},"useData":true});



this["ADF"]["templates"]["dropdownSelectItem"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.regionName || (depth0 != null ? depth0.regionName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"regionName","hash":{},"data":data}) : helper)))
    + "--";
},"3":function(depth0,helpers,partials,data) {
  return "checked";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<li>\n    <input type=\"checkbox\" id=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.regionName : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.regionName : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.checked : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n    <label for=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.regionName : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n</li>";
},"useData":true});



this["ADF"]["templates"]["formRow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "	<div class=\"form-row row\">\n		<div class=\"grid-spacer layout-grid-3\">&nbsp;</div>\n		<div class=\"form-input-notes layout-grid-6\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, placeat!</div>\n	</div>\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "            <span class=\"form-input-addon icon-tooltip icon form-tooltip tooltip-icon-inline\"><span class=\"tooltip\">";
  stack1 = ((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.html_prefix : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<div\n    class=\"form-row row "
    + escapeExpression(((helper = (helper = helpers.wrapClass || (depth0 != null ? depth0.wrapClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"wrapClass","hash":{},"data":data}) : helper)))
    + "\"\n    id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "-field-wrap\"\n    data-field-master-id=\""
    + escapeExpression(((helper = (helper = helpers.fldMstrId || (depth0 != null ? depth0.fldMstrId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fldMstrId","hash":{},"data":data}) : helper)))
    + "\"\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    >\n\n    <label for=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"layout-grid-3\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n    <div class=\"form-input layout-grid-6 layout-grid\">\n        ";
  stack1 = ((helper = (helper = helpers.inputField || (depth0 != null ? depth0.inputField : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inputField","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n</div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.html_suffix : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["gridCell"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing;
  stack1 = ((helper = (helper = helpers.inputField || (depth0 != null ? depth0.inputField : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inputField","hash":{},"data":data}) : helper));
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});



this["ADF"]["templates"]["gridHeaderCell"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "    <i class=\"icon icon-tooltip\">\n        <span class=\"tooltip\">\n          	";
  stack1 = ((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    	</span>\n    </i>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["gridRow"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing;
  stack1 = ((helper = (helper = helpers.spacer || (depth0 != null ? depth0.spacer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"spacer","hash":{},"data":data}) : helper));
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});



this["ADF"]["templates"]["gridTable"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"adf-grid-actions\">\n</div>\n<table class=\"adf-grid\">\n    <thead>\n        <tr>\n        </tr>\n    </thead>\n    <tbody>\n    </tbody>\n</table>\n";
  },"useData":true});



this["ADF"]["templates"]["gridWrapper"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"adf-grid-wrapper\">\n	<form action=\"json/file-upload.json\" method=\"POST\" enctype=\"multipart/form-data\"></form>\n	<div class=\"upload-drop-zone\"></div>\n</div>";
  },"useData":true});



this["ADF"]["templates"]["inputHelperSelect2Record"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "    <i class=\"icon icon-tooltip select2-help-text\">\n        <span class=\"tooltip\">\n            ";
  stack1 = ((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        </span>\n    </i>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["inputTypeActions"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <a\n    	href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\"\n    	class=\"btn btn-"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.actionClass || (depth0 != null ? depth0.actionClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"actionClass","hash":{},"data":data}) : helper)))
    + "\"\n    	data-action-type=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"\n    	title=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    >\n    <svg viewBox=\"0 0 32 32\" class=\"icon\">\n        <use xlink:href=\"#icon-"
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"></use>\n    </svg>\n    <span>\n        ";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    </span>\n    </a>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"4":function(depth0,helpers,partials,data) {
  return "    <div class=\"adf-grid-row-messages\"></div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.actions : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.gridRow : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["ADF"]["templates"]["inputTypeCheckbox"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<input type=\"checkbox\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(((helpers.optionSelected || (depth0 && depth0.optionSelected) || helperMissing).call(depth0, (depth0 != null ? depth0.value : depth0), (depth0 != null ? depth0.currentValue : depth0), {"name":"optionSelected","hash":{},"data":data})))
    + ">";
},"useData":true});



this["ADF"]["templates"]["inputTypeCheckboxes"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "    <input type=\"checkbox\" name=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\" id=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(((helpers.optionSelected || (depth0 && depth0.optionSelected) || helperMissing).call(depth0, (depth0 != null ? depth0.value : depth0), (depths[1] != null ? depths[1].currentValue : depths[1]), {"name":"optionSelected","hash":{},"data":data})))
    + ">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true,"useDepths":true});



this["ADF"]["templates"]["inputTypeDate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <input type=\"date\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"adf-grid-filter-value\">\n";
},"useData":true});



this["ADF"]["templates"]["inputTypeEmail"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<input type=\"email\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-input-field adf-grid-filter-value\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\">";
},"useData":true});



this["ADF"]["templates"]["inputTypeGridOverlay"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"adf-grid-overlay-editor\">\n	<div class=\"display-value adf-grid-filter-value\">\n		";
  stack1 = ((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"overlay-editor\"\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        >\n		<div id=\"grid-overlay-editor--"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"overlay-editor-grid-target\"></div>\n		<button type=\"button\" class=\"btn close icon icon-done\">done</button>\n	</div>\n</div>";
},"useData":true});



this["ADF"]["templates"]["inputTypeNumber"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <input type=\"number\" min=\"0\" max=\"9999\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"adf-grid-filter-value\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\">\n";
},"useData":true});



this["ADF"]["templates"]["inputTypeReadonly"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <span\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    >\n    <span>"
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "</span>\n    <input type=\"hidden\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\" class=\"adf-grid-filter-value\">\n  </span>\n";
},"useData":true});



this["ADF"]["templates"]["inputTypeSelect"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "		<option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(((helpers.optionSelected || (depth0 && depth0.optionSelected) || helperMissing).call(depth0, (depth0 != null ? depth0.value : depth0), (depths[1] != null ? depths[1].currentValue : depths[1]), {"name":"optionSelected","hash":{},"data":data})))
    + ">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<select name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"adf-grid-filter-value\">\n    <option>Please Select</option>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select>";
},"useData":true,"useDepths":true});



this["ADF"]["templates"]["inputTypeSelect2"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "multiple";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            data-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\"\n";
},"5":function(depth0,helpers,partials,data) {
  return "      <option></option>\n";
  },"7":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "      <option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tooltip : depth0), {"name":"if","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((helpers.optionSelected || (depth0 && depth0.optionSelected) || helperMissing).call(depth0, (depth0 != null ? depth0.value : depth0), (depths[1] != null ? depths[1].currentValue : depths[1]), {"name":"optionSelected","hash":{},"data":data})))
    + ">";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"if","hash":{},"fn":this.program(10, data, depths),"inverse":this.program(12, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</option>\n";
},"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return " data-tooltip=\""
    + escapeExpression(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" ";
},"10":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0));
  },"12":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<select\n    class=\"select2 form-input-field adf-grid-filter-value "
    + escapeExpression(((helper = (helper = helpers.fieldClass || (depth0 != null ? depth0.fieldClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fieldClass","hash":{},"data":data}) : helper)))
    + "\"\n    name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.multiple : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.dataAttributes : depth0), {"name":"each","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    >\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.required : depth0), {"name":"unless","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </select><!-- /.select2 -->\n";
},"useData":true,"useDepths":true});



this["ADF"]["templates"]["inputTypeText"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<input type=\"text\" name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-input-field adf-grid-filter-value\" value=\""
    + escapeExpression(((helper = (helper = helpers.currentValue || (depth0 != null ? depth0.currentValue : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentValue","hash":{},"data":data}) : helper)))
    + "\">";
},"useData":true});



this["ADF"]["templates"]["inputTypeTextarea"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <textarea name=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"adf-grid-filter-value\"></textarea>\n";
},"useData":true});



this["ADF"]["templates"]["moduleWrapper"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"dnd-item layout-grid-4\" id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <span class=\"dnd-handle icon icon-handle\"></span>\n    <header class=\"dnd-label\">\n        <p>"
    + escapeExpression(((helper = (helper = helpers.moduleLabel || (depth0 != null ? depth0.moduleLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"moduleLabel","hash":{},"data":data}) : helper)))
    + "</p>\n        <button type=\"button\" class=\"dnd-details-toggle icon icon-closed\"></button>\n    </header>\n    <ul class=\"dnd-details hide\"></ul>\n</div>";
},"useData":true});