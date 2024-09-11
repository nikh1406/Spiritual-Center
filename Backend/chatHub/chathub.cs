//using Backend.DTO;
//using Backend.Services;
//using ChatBot.Model;
//using Humanizer;
//using Microsoft.AspNetCore.SignalR;

//namespace ChatBot.chatHub
//{
//    public class chathub : Hub
//    {
//        private readonly IDictionary<string, userConnection> _userconnection;
//        private readonly IDictionary<string, Dictionary<string, List<ChatMessage>>> _chatHistory;
//        public chathub(IDictionary<string, userConnection> userconnection, Dictionary<string, Dictionary<string, List<ChatMessage>>> chatHistory)
//        {
//            _userconnection = userconnection;
//            _chatHistory = chatHistory;
//        }
//        public async Task JoinRoom(userConnection Connection)
//        {
//            await Groups.AddToGroupAsync(Context.ConnectionId, Connection.room!);
//            _userconnection[Context.ConnectionId] = Connection;

//            if (!_chatHistory.ContainsKey(Connection.room!))
//            {
//                _chatHistory[Connection.room!] = new Dictionary<string, List<ChatMessage>>();              
//            }
//            if (!_chatHistory[Connection.room!].ContainsKey(Context.ConnectionId))
//            {
//                _chatHistory[Connection.room!][Context.ConnectionId] = new List<ChatMessage>();
//            }

//            // Only send messages for this specific connection's history
//            foreach (var message in _chatHistory[Connection.room!][Context.ConnectionId])
//            {
//                await Clients.Client(Context.ConnectionId)
//                    .SendAsync("ReceiveMessage", message.Sender, message.Content, message.Timestamp);
//            }

//            await Clients.Group(Connection.room!).SendAsync("ReceiveMessage", Connection.user, $"{Connection.user} has Joined the Group", DateTime.Now);
//            await sendConnectedUser(Connection.room!);
//        }

//        // Sending Message
//        public async Task sendMessage(string message)
//        {
//            if (_userconnection.TryGetValue(Context.ConnectionId, out userConnection? Connection))
//            {
//                if (!_chatHistory.ContainsKey(Connection.room!))
//                {
//                    _chatHistory[Connection.room!] = new Dictionary<string, List<ChatMessage>>();
//                }
//                if (!_chatHistory[Connection.room!].ContainsKey(Context.ConnectionId))
//                {
//                    _chatHistory[Connection.room!][Context.ConnectionId] = new List<ChatMessage>();
//                }

//                _chatHistory[Connection.room!][Context.ConnectionId].Add(new ChatMessage
//                {
//                    Room = Connection.room!,
//                    Sender = Connection.user,
//                    Content = message,
//                    Timestamp = DateTime.Now
//                });

//                await Clients.Group(Connection.room!)
//                    .SendAsync("ReceiveMessage", Connection.user, message, DateTime.Now);
//            }
//        }

//        //Leave Group
//        public override Task OnDisconnectedAsync(Exception? exception)
//        {
//            if (!_userconnection.TryGetValue(Context.ConnectionId, out userConnection? connection))
//            {
//                Console.WriteLine(exception);
//                return base.OnDisconnectedAsync(exception);
//            }

//            if (_chatHistory.ContainsKey(connection.room!) && _chatHistory[connection.room!].ContainsKey(Context.ConnectionId))
//            {
//                _chatHistory[connection.room!].Remove(Context.ConnectionId);
//            }

//            _userconnection.Remove(Context.ConnectionId);
//            Clients.Group(connection?.room!).SendAsync("ReceiveMessage", connection.user, $"{connection?.user} has Left the Group", DateTime.Now);
//            sendConnectedUser(connection!.room!);
//            return base.OnDisconnectedAsync(exception);
//        }

//        // Send ConnectedUser
//        public Task sendConnectedUser(string room)
//        {
//            var users = _userconnection.Values.
//                Where(u => u.room == room)
//                .Select(s => s.user.ApplyCase(LetterCasing.Title));

//            //var users = _userconnection.Values.
//            //    Select(s => s.user);

//            return Clients.Group(room).SendAsync("ConnectedUser", users);
//        }


//        public Task sendAllComminityConnectedUser()
//        {
//            var users = _userconnection.Values
//               .Select(s => s.user.ApplyCase(LetterCasing.Title));
//            return Clients.All.SendAsync("ConnectedUser", users);
//        }


//    }
//}















using Backend.DTO;
using Backend.Services;
using ChatBot.Model;
using Humanizer;
using Microsoft.AspNetCore.SignalR;

namespace ChatBot.chatHub
{
    public class chathub : Hub
    {
        private readonly IDictionary<string, userConnection> _userconnection;
        private readonly IDictionary<string, List<ChatMessage>> _chatHistory;
        public chathub(IDictionary<string, userConnection> userconnection, IDictionary<string, List<ChatMessage>> chatHistory)
        {
            _userconnection = userconnection;
            _chatHistory = chatHistory;
        }
        public async Task JoinRoom(userConnection Connection)
        {
           
            if (!_chatHistory.ContainsKey(Connection.room!))
            {
                _chatHistory[Connection.room!] = new List<ChatMessage>();
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, Connection.room!);
            _userconnection[Context.ConnectionId] = Connection;

            foreach (var message in _chatHistory[Connection.room!])
            {

                await Clients.Client(Context.ConnectionId)
                    .SendAsync("ReceiveMessage", message.Sender, message.Content, message.Timestamp);
            }
            var roomUsers = _userconnection.Values.
                Where(u => u.room == Connection.room!)
                .Select(s => s.user)
                .ToList();
            var userExist = roomUsers.Where((u) => u == Connection.user).ToList();
            if (userExist.Count == 1)
            {
                await Clients.Group(Connection.room!).SendAsync("ReceiveMessage", Connection.user, $"{Connection.user} has Joined the Group", DateTime.Now);
            }
            await sendConnectedUser(Connection.room!);

        }

        // Sending Message
        public async Task sendMessage(string message)
        {
            if (_userconnection.TryGetValue(Context.ConnectionId, out userConnection? Connection))
            {
                if (!_chatHistory.ContainsKey(Connection.room!))
                {
                    _chatHistory[Connection.room!] = new List<ChatMessage>();
                }
                _chatHistory[Connection.room!].Add(new ChatMessage
               {
                    Room = Connection.room!,
                    Sender = Connection.user,
                    Content = message,
                    Timestamp = DateTime.Now
                });


                await Clients.Group(Connection.room!)
                    .SendAsync("ReceiveMessage", Connection.user, message, DateTime.Now);
            }
        }

        //Leave Group
        public override Task OnDisconnectedAsync(Exception? exception)    
        {
            if (!_userconnection.TryGetValue(Context.ConnectionId, out userConnection? connection))
            {
                Console.WriteLine(exception);
                return base.OnDisconnectedAsync(exception);
            }
            if (!_chatHistory.ContainsKey(connection.room!))
            {
                _chatHistory[connection.room!] = new List<ChatMessage>();
            }
            //_chatHistory[connection.room!].Add(new ChatMessage
            //    {
            //        Room = connection.room!,
            //        Sender = "Program Bot",
            //        Content = $"{connection?.user} has Left the Group",
            //        Timestamp = DateTime.Now
            //    });
            var roomUsers = _userconnection.Values.
                    Where(u => u.room == connection.room!)
                    .Select(s => s.user)
                    .ToList();
            var userExist = roomUsers.Where((u) => u == connection.user).ToList();
            _userconnection.Remove(Context.ConnectionId);

            if (userExist.Count == 1)
            {
                Clients.Group(connection?.room!).SendAsync("ReceiveMessage", connection.user, $"{connection?.user} has Left the Group", DateTime.Now);
            }
            sendConnectedUser(connection!.room!);
            return base.OnDisconnectedAsync(exception);
        }

        // Send ConnectedUser
        public Task sendConnectedUser(string room)
        {
            var users = _userconnection.Values.
                Where(u => u.room == room).Distinct()
                .Select(s => s.user.ApplyCase(LetterCasing.Title)).Distinct().ToList();

            //var users = _userconnection.Values.
            //    Select(s => s.user);

            return Clients.Group(room).SendAsync("ConnectedUser", users);
        }


        public Task sendAllComminityConnectedUser()
        {
            var users = _userconnection.Values.Distinct().Select(s => s.user.ApplyCase(LetterCasing.Title));
            return Clients.All.SendAsync("ConnectedUser", users);
        }

    }
}
