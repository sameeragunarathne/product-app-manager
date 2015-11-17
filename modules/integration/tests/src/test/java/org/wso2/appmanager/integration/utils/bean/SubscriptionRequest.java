/*
*Copyright (c) 2005-2010, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*WSO2 Inc. licenses this file to you under the Apache License,
*Version 2.0 (the "License"); you may not use this file except
*in compliance with the License.
*You may obtain a copy of the License at
*
*http://www.apache.org/licenses/LICENSE-2.0
*
*Unless required by applicable law or agreed to in writing,
*software distributed under the License is distributed on an
*"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
*KIND, either express or implied.  See the License for the
*specific language governing permissions and limitations
*under the License.
*/

package org.wso2.appmanager.integration.utils.bean;

/**
 * action=addAPISubscription&name=appName&version=1.0.0&provider=provider&tier=Gold&applicationName=DefaultApplication
 */
public class SubscriptionRequest extends AbstractRequest {

    private String name;
    private String provider;
    private String version;
    private String applicationName = "DefaultApplication";
    private String tier = "Unlimited";

    public SubscriptionRequest(String apiName, String provider, String version) {
        this.name = apiName;
        this.provider = provider;
        this.version = version;
    }

    @Override
    public void setAction() {
        setAction("addAPISubscription");
    }

    @Override
    public void init() {
        addParameter("apiName", name);
        addParameter("apiProvider", provider);
        addParameter("apiVersion", version);
        addParameter("appName", applicationName);
        addParameter("apiTier", tier);

    }

    public String getName() {
        return name;
    }

    public String getProvider() {
        return provider;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getTier() {
        return tier;
    }

    public void setTier(String tier) {
        this.tier = tier;
    }
}
