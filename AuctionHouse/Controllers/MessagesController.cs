using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace AuctionHouse.Controllers
{
    [Route("messages")]
    public class MessagesController : ControllerBase
    {
        private IHubContext<ChatHub> _hub;

        public MessagesController(IHubContext<ChatHub> hub)
        {
            _hub = hub;
        }

        public async Task Post()
        {
            await _hub.Clients.All.SendAsync("ReceiveMessage", "System", "Hello World");
        }
    }
}