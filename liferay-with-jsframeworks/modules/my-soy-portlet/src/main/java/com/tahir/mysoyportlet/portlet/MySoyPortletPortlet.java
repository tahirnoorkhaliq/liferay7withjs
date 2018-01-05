package com.tahir.mysoyportlet.portlet;

import com.tahir.mysoyportlet.constants.MySoyPortletPortletKeys;
import com.liferay.portal.kernel.template.Template;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.ReleaseInfo;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.portlet.bridge.soy.SoyPortlet;

import java.io.IOException;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.PortletURL;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Tahir Noor Khaliq
 */
@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.display-name=my-soy-portlet Portlet",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=View",
		"javax.portlet.name=" + MySoyPortletPortletKeys.MySoyPortlet,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user",	
		
		"com.liferay.portlet.add-default-resource=true",
		"com.liferay.portlet.application-type=full-page-application",
		"com.liferay.portlet.application-type=widget",		
		"com.liferay.portlet.layout-cacheable=true",
		"com.liferay.portlet.preferences-owned-by-group=true",
		"com.liferay.portlet.private-request-attributes=false",
		"com.liferay.portlet.private-session-attributes=false",
		"com.liferay.portlet.render-weight=50",
		"com.liferay.portlet.scopeable=true",
		"com.liferay.portlet.use-default-template=true",		
		"javax.portlet.expiration-cache=0",
		"javax.portlet.init-param.copy-request-parameters=true",		
		"javax.portlet.supports.mime-type=text/html"
		
		
	},
	service = Portlet.class
)
public class MySoyPortletPortlet extends SoyPortlet {

	@Override
	public void render(
			RenderRequest renderRequest, RenderResponse renderResponse)
		throws IOException, PortletException {
		Template template = getTemplate(renderRequest);
		ThemeDisplay themeDisplay = (ThemeDisplay)renderRequest.getAttribute(
				WebKeys.THEME_DISPLAY);

		template.put("layouts", themeDisplay.getLayouts());
		
		System.out.println("1");

		PortletURL navigationURL = renderResponse.createRenderURL();
		
		System.out.println("2  "+template);
		
		navigationURL.setParameter("mvcRenderCommandName", "Navigation");
		
		System.out.println("3  "+navigationURL);
		
		template.put("navigationURL", navigationURL.toString());
		
		System.out.println("4");
		
		template.put("releaseInfo", ReleaseInfo.getReleaseInfo());
		
		System.out.println("5");
		
		super.render(renderRequest, renderResponse);
	}

}