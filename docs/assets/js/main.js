(function () {

    var mermaidCounter = 1;

    window.$docsify = {
        loadSidebar: true,
        subMaxLevel: 2,
        homepage: 'preface.md',
        name: 'Introduction to<br>Computer Science',
        repo: 'lexuzieel/computer-science',
        darklightTheme: {
            dark: {
                'mono-hue': '207', // Python blue hue
                'mono-saturation': '25%',
                'primary-color': '#ffd343', // Python yellow color
                'code-theme-background': 'var(--mono-shade2)',
                'sidebar-active-icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.2' height='7' viewBox='0 0 11.2 7'%3E%3Cpath d='M1.5 1.5l4.1 4 4.1-4' stroke-width='1.5' stroke='%23ffd343' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
            },
            light: {
                'mono-hue': '46', // Python yellow hue
                'mono-saturation': '10%',
                'primary-color': '#3776ab', // Python blue color
                'code-theme-background': 'var(--mono-tint3)',
                'sidebar-active-icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.2' height='7' viewBox='0 0 11.2 7'%3E%3Cpath d='M1.5 1.5l4.1 4 4.1-4' stroke-width='1.5' stroke='%233776ab' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
            }
        },
        markdown: {
            renderer: {
                code: function (code, lang) {
                    var editorSuffix = '.editor'

                    if (lang.endsWith(editorSuffix)) {
                        lang = lang.substr(0, lang.length - editorSuffix.length)
                    } else if (lang == "mermaid") {
                        return (
                            '<div class="mermaid" data-source="' + code + '">' +
                            mermaid.render(
                                'mermaid-svg-' + mermaidCounter++,
                                code
                            ) +
                            '</div>'
                        );
                    }

                    return this.origin.code.apply(this, arguments);
                }
            }
        },
        plugins: [
            function (hook, vm) {
                hook.doneEach(function () {
                    $('#docsify-darklight-theme').on('click', function (e) {
                        for (var block of $('.mermaid')) {
                            $(block).html(mermaid.render(
                                'mermaid-svg-' + mermaidCounter++,
                                $(block).data('source')
                            ))
                        }

                        mermaid.initialize({
                            theme: localStorage.getItem('DARK_LIGHT_THEME') == 'dark' ? 'dark' : 'neutral',
                        });
                    })
                })
            }
        ]
    };

    mermaid.initialize({
        startOnLoad: false,
        theme: (
            localStorage.getItem('DARK_LIGHT_THEME') == 'dark' ||
            (
                localStorage.getItem('DARK_LIGHT_THEME') == undefined &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            )
        ) ? 'dark' : 'neutral',
    });
})()
