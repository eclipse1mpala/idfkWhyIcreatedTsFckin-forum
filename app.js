const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_u75OjV44Wx5I1j_ErFBpvg_QLLWkLvp";

const supabase = initialSupabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


async function loadMessages() {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('id', { ascending: false });

    if (error) return;

    const container = document.getElementById('forumMessages');
    container.innerHTML = '';

    data.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.style.display = 'flex';
        card.style.gap = '15px';
        card.style.alignItems = 'center';
        
        const avatarImg = document.createElement('img');
        avatarImg.src = msg.avatar || 'kek.jpg';
        avatarImg.style.width = '50px';
        avatarImg.style.height = '50px';
        avatarImg.style.borderRadius = '50%';
        avatarImg.style.objectFit = 'cover';

        const contentBlock = document.createElement('div');

        const author = document.createElement('div');
        author.className = 'message-author';
        author.innerText = msg.username;

        const text = document.createElement('div');
        text.className = 'message-text';
        text.innerText = msg.text;

        contentBlock.appendChild(author);
        contentBlock.appendChild(text);
        
        card.appendChild(avatarImg);
        card.appendChild(contentBlock);
        container.appendChild(card);
    });
}

async function sendMessage() {
    const username = document.getElementById('usernameInput').value || 'Anonymous';
    const avatar = document.getElementById('avatarInput').value;
    const text = document.getElementById('messageInput').value;

    if (!text) return;

    const { error } = await supabase
        .from('messages')
        .insert([{ username: username, avatar: avatar, text: text }]);

    if (!error) {
        document.getElementById('messageInput').value = '';
        loadMessages();
    }
}

loadMessages();
