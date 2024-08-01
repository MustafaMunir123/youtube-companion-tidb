(async function () {
  const getChatbotBubbleDetails = async (baseUrl, botId) => {
    try {
      const AI_SERVICE_URL = `${baseUrl}/api/v1/chatbot/${botId}/get-chatbot-appearance/`;
      const res = await fetch(AI_SERVICE_URL);
      return await res.json();
    } catch (_) {
      console.error('error occured while fetching chatbot bubble details');
      return null;
    }
  };

  const { org_id, bot_id, bot_name } = window.chatwardsConfig;
  const baseUrl = document.getElementById(bot_id).src.split('/').slice(0, 3).join('/');
  const chatbotBubble = await getChatbotBubbleDetails(baseUrl, bot_id);
  if (chatbotBubble === null) {
    return;
  }
  const { data: chatbotConfig } = chatbotBubble;
  const iframeUrl = `${baseUrl}/chatbot-iframe/${org_id}/${bot_id}?bot_name=${chatbotConfig?.name}`;
  const iframe = document.createElement('iframe');
  const iframeId = 'chatwards-iframe';

  // all fields style
  const getIframeStyle = (botConfigs) => {
    return {
      display: 'none',
      border: 'none',
      position: 'fixed',
      bottom: chatbotBubble.data.icon_size > 56 ? '6rem' : '5rem',
      right: '1rem',
      width: '448px',
      height: botConfigs.height ? `${botConfigs.height}vh` : '75vh',
      maxHeight: '824px',
      borderRadius: '8px',
      zIndex: '2147483646',
      overflow: 'hidden',
      left: 'unset',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px 0px',
    };
  };

  const getBotPopupButtonStyle = (botConfigs) => {
    return {
      position: 'fixed',
      bottom: botConfigs.bottom ? `${botConfigs.bottom}px` : '16px',
      right: botConfigs.horizontal ? `${botConfigs.horizontal}px` : '16px',
      width: botConfigs.icon_size ? `${botConfigs.icon_size}px` : '50px',
      height: botConfigs.icon_size ? `${botConfigs.icon_size}px` : '50px',
      borderRadius: '100%',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px',
      cursor: 'pointer',
      zIndex: '2147483645',
      transition: 'all 0.2s ease-in-out 0s',
      left: 'unset',
      transform: 'scale(1)',
      background: '#635cff',
    };
  };

  const buttoninnerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: '99999',
  };

  const chatbotIconStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '100%',
  };

  const closeIconStyle = {
    display: 'none',
    width: '100%',
    height: '100%',
    borderRadius: '100%',
  };

  // Create the iframe element
  function loadChatwardsIframe() {
    iframe.id = iframeId;
    iframe.src = `${iframeUrl}`;
    // Apply styles to the iframe
    Object.assign(iframe.style, getIframeStyle(chatbotConfig));
    // Append the iframe to the body
    document.body.appendChild(iframe);
  }

  function chatbotButton(onChatwardsButtonClick) {
    // Create the chatbot button
    const chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatwards-gol-button';
    // Create the inner content of the button
    const buttonInnerContent = document.createElement('div');

    // Create the chatbot icon image
    const chatbotIcon = document.createElement('img');
    chatbotIcon.id = 'chatwards-gol-icon-img';
    chatbotIcon.src = chatbotConfig.chat_icon
      ? chatbotConfig.chat_icon
      : `${baseUrl}/assets/svg/logo.svg`;

    // Create the close icon image
    const closeIcon = document.createElement('img');
    closeIcon.id = 'chatwards-gol-close-icon';
    // Todo : change the close icon
    closeIcon.src = chatbotConfig.chat_icon
      ? chatbotConfig.chat_icon
      : `${baseUrl}/assets/svg/chevron-down-solid.svg`;

    Object.assign(chatbotButton.style, getBotPopupButtonStyle(chatbotConfig));
    Object.assign(buttonInnerContent.style, buttoninnerContentStyle);
    Object.assign(chatbotIcon.style, chatbotIconStyle);
    Object.assign(closeIcon.style, closeIconStyle);

    // Add event handler to the button
    chatbotButton.addEventListener('click', onChatwardsButtonClick);

    // Append the icons to the button inner content
    buttonInnerContent.appendChild(closeIcon);
    buttonInnerContent.appendChild(chatbotIcon);
    // Append the inner content to the button
    chatbotButton.appendChild(buttonInnerContent);
    // Append the chatbot button to the body
    document.body.appendChild(chatbotButton);
  }

  function initialize() {
    //load iframe
    loadChatwardsIframe();

    //load chatbot button
    chatbotButton(function () {
      isChatwardsIFrameVisible = iframe.style.display !== 'none';
      iframe.style.display = isChatwardsIFrameVisible ? 'none' : 'block';
      document.getElementById('chatwards-gol-close-icon').style.display = isChatwardsIFrameVisible
        ? 'none'
        : 'block';
      document.getElementById('chatwards-gol-icon-img').style.display = isChatwardsIFrameVisible
        ? 'block'
        : 'none';
    });
  }

  initialize();
})();
