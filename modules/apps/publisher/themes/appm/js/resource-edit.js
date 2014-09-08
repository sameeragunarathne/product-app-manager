
$( document ).ready(function() {

    $("#add_resource").click(function(){

        $(".http_verb").each(function(){
            var resource = {};
            resource.url_pattern = $("#url_pattern").val();
            resource.http_verb = $(this).val();
            resource.user_roles = $("#user_roles").val();
            if($(this).is(':checked')){
            	if(resource.url_pattern != ""){
                    RESOURCES_1.push(resource);
            	}
            }
        })

        $("#resource_tbody").trigger("draw");
        console.log(RESOURCES_1);
    });

    $("#resource_tbody").delegate(".delete_resource","click", function(){
        var i = $(this).attr("data-index");
        RESOURCES_1.splice(i, 1);

        // Invalidate relevant entitlement policy
        invalidateEntitlementPolicy(i);

        $("#resource_tbody").trigger("draw");
        console.log(RESOURCES_1);
    });

    $("#resource_tbody").on("draw", function(){
        $("#resource_tbody").html("");
        for(var i=0; i< RESOURCES_1.length; i++){
            $("#resource_tbody").prepend(
                    "<tr> \
                      <td><span style='color:#999'>/{context}/{version}/</span>"+ RESOURCES[i].url_pattern +" <input type='hidden' value='"+RESOURCES[i].url_pattern+"' name='uritemplate_urlPattern"+i+"'/></td> \
                  <td><strong>"+ RESOURCES[i].http_verb +"</strong><input type='hidden' value='"+RESOURCES[i].http_verb+"' name='uritemplate_httpVerb"+i+"'/></td> \
                  <td style='padding:0px'><select name='uritemplate_tier"+i+"' class='selectpicker' id='getThrottlingTier' style='width:100%;border:none;'><option title='Allows unlimited requests' value='Unlimited'>Unlimited</option><option title='Allows 5 request(s) per minute.' value='Silver'>Silver</option><option title='Allows 20 request(s) per minute.' value='Gold'>Gold</option><option title='Allows 1 request(s) per minute.' value='Bronze'>Bronze</option></select></td> \
                  <td style='padding:0px'><select name='uritemplate_skipthrottle"+i+"' class='selectpicker' id='' style='width:100%;border:none;'><option value='False'>False</option><option value='True'>True</option></select></td> \
                  <td class='userRoles' style='padding:0px'><input type='text' name='uritemplate_userRoles"+i+"' id='getUserRoles"+i+"' style='width:95%;border:none;'></input></td> \
                  <td> \
                    \
                    <ul class='nav navbar-nav navbar-right'>\
                <li class='dropdown'> \
                    <a href='#' data-toggle='dropdown' class='dropdown-toggle'>Add <b class='caret'></b></a>\
                    <ul  id='dropdown_entitlementPolicyPartialMappings"+i+"' class='dropdown-menu policy-partial-dropdown' data-resource-id='"+ i +"' style='z-index: 10000'>\
                    \
                    </ul>\
                </li>\
                </ul> \
                    \
                    \
                    <input type='hidden' id='uritemplate_entitlementPolicyPartialMappings"+i+"'  name='uritemplate_entitlementPolicyPartialMappings"+i+"'value='[]'/> \
                  </td> \
                  <td> \
                  	<a data-index='"+i+"' class='delete_resource'><i class='icon-trash icon-white'></i></a>&nbsp; \
                  </td> \
                </tr> \
				"
            );
 
            // roles autocomplete   
            $('#getUserRoles'+i).tokenInput('/publisher/api/lifecycle/information/meta/' + $('#meta-asset-type').val() + '/roles', {
              	theme: 'facebook',
              	//prePopulate: $.parseJSON(json),
              	tokenDelimiter: ',',
              	preventDuplicates: true    	
          	});
            if(RESOURCES_1[i].user_roles.indexOf(',')>-1){
            	var res = RESOURCES_1[i].user_roles.split(",");
            	for(var j=0; j< res.length; ++j){
            		$('#getUserRoles'+i).tokenInput("add", {id:res[j] , name:res[j]});
            		console.log(res[j]);
            	}
            }
            else{
            	$('#getUserRoles'+i).tokenInput("add", {id:RESOURCES_1[i].user_roles , name: RESOURCES_1[i].user_roles});
            }
            
            document.getElementById(RESOURCES_1[i].throttling_tier).selected="true";
            document.getElementById(RESOURCES_1[i].skipthrottle).selected="true";  
        }
    });

    $(document).on("click", ".add_entitlement_policy", function () {
      var resourceIndex = $(this).data('index');
      preparePolicyEditor(resourceIndex);
    })

    $(document).on("click", ".delete_entitlement_policy", function () {
      var resourceIndex = $(this).data('index');
      deleteEntitlementPolicy(resourceIndex);
    })

    $("#resource_tbody").trigger("draw");
});

// NOTE : This function is used as a workaround for a bug in registry model import and export.
// When the value of an attribute is "" import and export modifies as " ".
function getValidatedEntitlementPolicyId(resourceIndex){

  var policyId = RESOURCES_1[resourceIndex].entitlement_policy_id;

  if(policyId){
    return policyId.trim();
  }else{
    return "";
  }
}
