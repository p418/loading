module.exports=(function()
{
	function Spinner(type)
	{
		this.frames = (this.types[type]||this.types['basic']);
	}

	Spinner.prototype = {
		types  : 	{

		'basic'  		: '|/—\\',
		'circle-light' 	: ['◜ ',' ◝',' ◞','◟ '],
		'circle-cross' 	: '⊕⊗',
		'circle'		: '◐◓◑◒',

		'square-light'	: ['⌜ ',' ⌝',' ⌟','⌞ '],
		'square-corner' : '◢◣◤◥',
		'square-line' 	: '▤▧▥▨',

		'bar-v'	: '▁▂▃▄▅▆▇█▇▆▄▂▁',
		'bar-h'	: '▏▎▍▌▋▋▊▋▌▍▎▏',

		'triangle-bold' : '▲▶▼◀',

		'arrow-barrel': '➮➱➯➭➫━',
		'warning' : '░▒▓▓▒'
		},
		decoration	: { left : '', right : '' },
		frame  		: 0,
		toString : function()
		{
			var left	= typeof(this.decoration.left)=='function'?this.decoration.left():this.decoration.left;
			var right 	= typeof(this.decoration.right)=='function'?this.decoration.right():this.decoration.right;

			return left+bar+right;
		},
		print : function()
		{
			process.stdout.write('\r'+this);
		},
		autoSpin 	: function(speed)
		{
			if(!this.interval)
			{
				speed = (speed||250);
				this.interval = setInterval(this.autoSpin.bind(this), speed);
			}
			else
			{
				this.spin()
			}
		},
		spin : function()
		{
			process.stdout.write('\r'+this.decoration.left+this.frames[this.frame]+this.decoration.right);
			this.frame = (++this.frame%this.frames.length);
		},
		stop : function()
		{
			if(this.interval)
			{
				clearInterval(this.interval);
				this.interval = null;
			}
		}
	};




	function ProgressBar(type)
	{
		this.frames = (this.types[type]||this.types['basic']);
		this.intermediate=null;
		
		var frm = this.frames;
		
		if(frm.length == 2)
		{
			this.on = frm[0]; this.off = frm[1];
		}
		else
		{
			this.on = frm[0]; this.intermediate = frm[1]; this.off = frm[2];	
		}

	}

	ProgressBar.prototype = {
		types  : 	{
			'basic' 	: '=*-',
			1	: '▓▒░',
			2	: '▓▊░',
			3	: '▊▯',
			4 	: '●○',
			5 	: '◉◎',
			6 	: '◍◌',
			7 	: '▮▯',
			8 	: '☗☖',
			9 	: '▩ ',
			10	: '■□',
			11	: '≣⋑ ',
		},
		size 		: 100,
		step 		: 0.1,
		progression	: 0,
		value 		: 0,
		decoration	: { left : '', right : '' },
		reset : function()
		{
			this.progression = 0;
			this.value = 0;
		},
		progress 	: function(value)
		{
			this.progression 	= (value||this.progression+this.step);
			this.value 		= (this.progression*this.size);	


			value = Math.floor(this.progression*this.size);

			value -= !!(this.intermediate);

			this.bar = '';
			this.bar += (value>0?Array(value).join(this.on):'')
			this.bar += (this.intermediate)?this.intermediate:''
			this.bar += Array(this.size-value).join(this.off);
		
			return this;	
		},
		toString : function()
		{
			var left	= typeof(this.decoration.left)=='function'?this.decoration.left():this.decoration.left;
			var right 	= typeof(this.decoration.right)=='function'?this.decoration.right():this.decoration.right;

			return left+this.bar+right;
		},
		print : function()
		{
			process.stdout.write('\r'+this);
		},
		autoSpin : function(speed)
		{
			if(!this.interval)
			{
				speed = (speed||250);
				this.interval = setInterval(this.autoSpin.bind(this), speed);
			}
			else
			{
				if(this.progression+this.step >= 1)
					this.progression = this.step;

				this.progress();
			}
		},
		stop : function()
		{
			if(this.interval)
			{
				clearInterval(this.interval);
				this.interval = null;
			}
		}

	}

	return {
		Spinner 	: Spinner,
		ProgressBar : ProgressBar
	}
})();
